import OpenAI from "openai";
import fs from "fs";
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//npx ts-node src/genai/openai/edit-image.ts
async function main() {
    const imagePath = path.join(__dirname, '../../../base/output.png');
    const maskPath = path.join(__dirname, '../../../base/mask.png');

    const image = await openai.images.edit({
        image: fs.createReadStream(imagePath),
        mask: fs.createReadStream(maskPath),
        prompt: "cat in the image is now wearing eye glasses",
    });
    
    console.log(image.data); 
}

main();