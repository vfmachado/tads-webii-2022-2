
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const uploadToS3 = async (filename, key, bucket = 'tads-2022-webii') => {
    
    // TEM QUE ESTAR NO .ENV E NAO DEVE SER POSTADO
    // CHAVE DE ACESSO
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    });

    const file = fs.readFileSync(
        filename
    );

    const params = {
        Bucket: bucket,
        Key: key,
        Body: file,
        // ACL: 'public-read',
        // ContentType: file.mimetype,
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
          if (err) {
            console.log('Error uploading file', err);
            reject(err);
          }
          resolve(data.Location);
        });
      });

}
module.exports = uploadToS3;