const firebase = require('./firebase'); // Firebase konfigürasyonu buradan alınabilir

async function uploadMultipleImages(files: any[], folder: string, who: string, deleteIfExists: string[] = []) {
    try {
        const uploadPromises = files.map(async (file, index) => {
            const filePath = 'images/' + folder + ((file.originalname).replace(' ', '-')).substr(0, 6) + '-' + who + '-' + Date.now();

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

            return new Promise((resolve, reject) => {
                blobWriter.on('error', (err: Error) => {
                    reject(err);
                });

                blobWriter.on('finish', async () => {
                    const signedURL = await blob.getSignedUrl({ action: 'read', expires: '03-01-2500' });

                    resolve({
                        url: signedURL[0],
                        path: filePath
                    });
                });

                blobWriter.end(file.buffer);
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

