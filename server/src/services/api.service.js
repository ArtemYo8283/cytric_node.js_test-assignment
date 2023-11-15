import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import sharp from 'sharp';
import { server, host } from '../index.js';
import generateUniqueFileName from "../middleware/generateUniqueFileName.middleware.js";
import Image_history from "../models/image_history.model.js";
const execPromise = promisify(exec);

export default class ApiService {
    async getStatus() {
        const healthCheck = {
            status: 'ok',
            message: 'API is running',
        };
        // Execute 'npm list --depth=0' command to get all dependencies
        try {
            // Execute 'npm list --depth=0' command to get all dependencies
            const { stdout, stderr } = await execPromise('npm list --depth=0 --json');
            // Parse the JSON output
            const dependencies = JSON.parse(stdout).dependencies;
            // Add dependencies to the health check response
            healthCheck.dependencies = dependencies;
            return healthCheck;
         } catch (error) {
            console.error(`Error: ${error.message}`);
            return { error: 'Internal Server Error' };
        }
    }

    async processImage(imageUrl) {
        // Get the image from the specified URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        // Process the image: apply a grayscale filter and resize to 200x200
        const processedImageBuffer = await sharp(response.data)
        .grayscale() // Apply grayscale filter
        .resize(200, 200) // Resize to 200x200
        .toBuffer();
        // Generate a unique file name
        const imageFileName = await generateUniqueFileName();
        // Save the processed image in the 'assets/images' folder with a unique name
        const savedImagePath = `assets/images/${imageFileName}.jpg`;
        await sharp(processedImageBuffer).toFile(savedImagePath);
        // Create a URL for the client based on the server's host and port
        const imageUrlForClient = `${host}:${server.address().port}/images/${imageFileName}.jpg`;
        // Save image processing history in the database
        const newImage_history = await Image_history.create({
            urlOrigin: imageUrl,
            urlNew: imageUrlForClient
        });
        // Return the URL of the processed image for the client
        return { imageUrl: imageUrlForClient };
    }
}

