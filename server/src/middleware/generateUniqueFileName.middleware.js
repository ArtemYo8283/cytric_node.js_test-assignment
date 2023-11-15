import path from 'path';

export default async function generateUniqueFileName() {
    // Get the current timestamp in ISO format and remove characters '-', ':', and '.'
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    // Generate a random string by converting a random number to base 36 and extracting a substring
    const randomString = Math.random().toString(36).substring(2, 8);
    // Combine the timestamp and random string to create a unique file name
    const uniqueFileName = `${timestamp}_${randomString}`;
    return uniqueFileName;
}
