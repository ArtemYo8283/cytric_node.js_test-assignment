import path from 'path';

export default async function generateUniqueFileName() {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueFileName = `${timestamp}_${randomString}`;
    return uniqueFileName;
}
