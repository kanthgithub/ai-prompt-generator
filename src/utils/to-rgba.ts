import Jimp from "jimp";
import sharp from 'sharp';

export const convertToRgba = async (ImageBuffer: Buffer, filename: string) => {
    let jImage = await Jimp.read(ImageBuffer);

    const w = jImage.bitmap.width;
    const h = jImage.bitmap.height;

    if ((w / h) != 1) {
        throw new Error("Image must be a square. Current ratio = " + (w / h));
    }

    if (!jImage.hasAlpha()) { //Check if image has opacity
        jImage = jImage.opacity(1); //Add if it doesn't 
    }

    const jsize = (await jImage.getBufferAsync(Jimp.AUTO.toString())).byteLength;

    if (jsize >= 4000000) { //Check size
        throw new Error(
                "Image must be less than 4MG currenty image is " +
                jsize + " bytes with Alpha");
    }

    jImage.write(`../../base/${filename}`); //Make PNG
}

async function convertToRgbaSharp(imagePath: string, outputPath: string) {
    await sharp(imagePath)
        .ensureAlpha()
        .toFormat('png')
        .toFile(outputPath);
}

// npx ts-node src/utils/to-rgba.ts
convertToRgbaSharp('./base/image.png', './base/output.png')
    .then(() => {
        console.log('Image conversion complete');
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });