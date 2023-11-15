import { exec } from 'child_process';
import { promisify } from 'util';

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
}

