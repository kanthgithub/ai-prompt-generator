import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//npx ts-node src/openai/generic-test.ts
async function main() {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
    console.log(image.data);  
}

main();