import OpenAI from "openai";
import fs from "fs";
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//npx ts-node src/openai/edit-image.ts
async function main() {
    const imagePath = path.join(__dirname, '../../base/new-cat.png');
    const image = await openai.images.edit({
        image: fs.createReadStream(imagePath),
        prompt: "A Pixelated Cat wearing a beret",
    });
    
      console.log(image.data); 
}

main();