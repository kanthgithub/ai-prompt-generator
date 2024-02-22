import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const generateImage = async (prompt: string) => {
    const config = {
        method: "post",
        url: "https://api.mymidjourney.ai/api/v1/midjourney/imagine",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MIDJOURNEY_API_KEY}`,
        },
        //A little cat running on the grass
        //https://dengguanglei.com/img/Schrodingers-Cat.jpg with jolly face and bespectable eyes and sky blue background with 300x300 resolution
        data: {
            prompt: prompt,
        },
    };

    const response = await axios(config);

    //check for response status
    if (response.status !== 200) {
        console.log(`response status: ${response.status}`);
        throw new Error('Failed to generate image');
    }

    console.log(`response status: ${response.status}`);
    console.log(`response data: ${JSON.stringify(response.data)}`);
    return response.data;
}

// Usage
// call async function here to execute it via npx ts-node src/genai/midjourney/generate-image.ts
// Output: 200 OK

(async () => {
    try {
        const responseData = await generateImage("https://i.postimg.cc/zvHy3DRf/new-cat.jpg A pixelated cat with hat and with resolution 64X64 pixels.");
        console.log(`response data is: ${JSON.stringify(responseData)}`);
    } catch (error) {
        console.error(error);
    }
})();