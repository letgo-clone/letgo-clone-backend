"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sharp = require('sharp');
const firebase = require('./firebase'); // Firebase konfigürasyonu buradan alınabilir
function uploadMultipleImages(files, folder, who, deleteIfExists = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uploadPromises = files.map((file, index) => __awaiter(this, void 0, void 0, function* () {
                const compressedBuffer = yield sharp(file.buffer).toBuffer();
                const filePath = 'images/' + folder + ((file.originalname).replace(' ', '-')).substr(0, 6) + '-' + who + '-' + +Date.now();
                if (deleteIfExists[index]) {
                    const existingFile = firebase.bucket.file(deleteIfExists[index]);
                    const [exists] = yield existingFile.exists();
                    if (exists) {
                        yield existingFile.delete();
                    }
                }
                const blob = firebase.bucket.file(filePath);
                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype
                    }
                });
                const imageInfo = yield sharp(compressedBuffer).metadata();
                return new Promise((resolve, reject) => {
                    blobWriter.on('error', (err) => {
                        reject(err);
                    });
                    blobWriter.on('finish', () => {
                        blob.getSignedUrl({ action: 'read', expires: '03-01-2500' }, (err, signedURL) => {
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
            }));
            return Promise.all(uploadPromises);
        }
        catch (error) {
            throw error;
        }
    });
}
function removeOldImage(deleteIfExist = '') {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (deleteIfExist) {
                const file = firebase.bucket.file(deleteIfExist);
                const [exists] = yield file.exists();
                exists && (yield file.delete());
            }
        }
        catch (error) {
            throw error;
        }
    });
}
module.exports = { uploadMultipleImages, removeOldImage };
