import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//npx ts-node src/openai/generate-from-prompt.ts
async function main() {
    const image = await openai.images.generate({ model: "dall-e-3", 
    prompt: "'An image of a cat, rendered in a pixelated style." });
    console.log(image.data);  
}

main();