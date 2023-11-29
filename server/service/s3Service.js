import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Function to upload an image to S3
const uploadToS3 = (imageData, key) => {
    return new Promise((resolve, reject) => {

      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: imageData,
        ACL: 'public-read'
      };
  
      s3.upload(params, (err, data) => {
        if (err) {
          console.log("error in uploadToS3: ", err.message);
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };

export default uploadToS3;