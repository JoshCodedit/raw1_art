import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
  /**
   * Function to upload an image to S3
   * @param {Buffer} fileBuffer - The file buffer to upload
   * @param {string} fileName - The name of the file to be saved in S3
   * @returns {Promise} - Resolves to the URL of the uploaded image
   */
  
  export function uploadToS3(fileBuffer, fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,  // You can customize the file name here
      Body: fileBuffer,
      ACL: 'public-read', // Make the image publicly accessible
      ContentType: 'image/jpeg', // Change based on your file type
    };
  
    return s3.upload(params).promise()
      .then(data => {
        console.log('File uploaded successfully', data.Location);
        return data.Location; // The URL of the uploaded file
      })
      .catch(err => {
        console.error('Error uploading file:', err);
        throw new Error('S3 upload failed');
      });
  }