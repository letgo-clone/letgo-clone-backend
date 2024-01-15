const sharp = require('sharp');
const firebase = require('./firebase'); // Firebase konfigürasyonu buradan alınabilir

async function uploadMultipleImages(files: any[], folder: string, who: string, deleteIfExists: string[] = []) {
    try {
        const uploadPromises = files.map(async (file, index) => {
            const compressedBuffer = await sharp(file.buffer).toBuffer();
            const filePath = 'images/' + folder + ((file.originalname).replace(' ', '-')).substr(0,6) + '-' + who + '-' + + Date.now();


            if (deleteIfExists[index]) {
                const existingFile = firebase.bucket.file(deleteIfExists[index]);
                const [exists] = await existingFile.exists();

                if (exists) {
                    await existingFile.delete();
                }
            }

            const blob = firebase.bucket.file(filePath);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });
            const imageInfo = await sharp(compressedBuffer).metadata();

            return new Promise((resolve, reject) => {
                blobWriter.on('error', (err: Error) => {
                    reject(err);
                });

                blobWriter.on('finish', () => {
                    blob.getSignedUrl({ action: 'read', expires: '03-01-2500' }, (err: Error, signedURL: any) => {
                        if (err) {
                            reject(err);
                        }
                        resolve({ 
                            url: signedURL, 
                            path: filePath,
                            width: imageInfo.width,
                            height: imageInfo.height
                        });
                    });
                });

                blobWriter.end(compressedBuffer);
            });
        });

        return Promise.all(uploadPromises);
    } catch (error) {
        throw error;
    }
}


async function removeOldImage(deleteIfExist = '') {
    try {
        if (deleteIfExist) {
            const file = firebase.bucket.file(deleteIfExist);
            
            const [exists] = await file.exists();

            exists && await file.delete();
        }
      
    } catch (error) {
        throw error;
    }
}

module.exports = {uploadMultipleImages, removeOldImage}

