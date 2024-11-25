import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';  // Import necessary modules


// Configure S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Upload the file to S3
export const uploadToS3 = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);  // Read the image file

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,  // Your S3 bucket name
        Key: `products/${Date.now()}_${fileName}`,  // Generate a unique name or timestamp for the file
        Body: fileContent,  // The actual file content to upload
        ContentType: 'image/jpeg'  // Adjust this based on the file type (e.g., 'image/png', 'image/jpeg')
    };

    try {
        // Use S3Client to upload the file
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('S3 Upload Response:', data);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`; // Return the file URL
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        throw new Error('Error uploading file to S3');
    }
};
