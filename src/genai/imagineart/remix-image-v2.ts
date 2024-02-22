import { TraitsRecordItem } from "src/genai/types";
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';
import Jimp from 'jimp';
import util from 'util';
import dotenv from 'dotenv';
dotenv.config();

// shrodinger cat with jolly face and bespectable eyes and sky blue background with 300x300 resolution, limited palette with blocky pixels --s {10, 30, 60, 90} --no details

export const generateImageFromPrompt = async(baseCat: string, prompt: string) : Promise<Buffer> => {
    let formdata = new FormData();
    formdata.append("prompt", prompt);

    // 21
    // Anime - Bring characters and stories to life with vibrant and expressive artwork inspired by Japanese animation.

    // 22
    // Imagine V1 - A dynamic art style: photorealism meets boundless creativity.

    // 29
    // Realistic - Craft intricate, lifelike visuals with detailed textures, capturing reality's essence.
    formdata.append("style_id", "22");
    formdata.append("strength", "50");
    formdata.append("control", "depth");

    //Configures the generator's function.
    formdata.append("cfg", "11.5");
    const catname = `${baseCat}.png`;
    let imageBuffer = fs.readFileSync(`./base/${catname}`);
    formdata.append("image", imageBuffer, catname);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
            ...formdata.getHeaders(),
            "Authorization": `Bearer ${process.env.IMAGINE_ART_API_KEY}`
        }
    };

    const response = await fetch("https://api.vyro.ai/v1/imagine/api/edits/remix", requestOptions);

    //check for response status
    if (response.status !== 200) {
        console.log(`response status: ${response.status}`);
        throw new Error('Failed to generate image');
    }

    console.log(`response status: ${response.status}`);

    // parse response data
    const responseData = await response.buffer();

    // Generate a timestamp
    const timestamp = Date.now();
    const filename = `cat_${timestamp}.png`;

    // Write the binary data to a JPEG file
    fs.writeFileSync(filename, responseData);

    // Read the image
    const image = await Jimp.read(filename);

    // Resize the image
    image.resize(300, 300);

    // Write the resized image to a new file
    const newFilename = 'resized_' + filename;
    await image.writeAsync(newFilename);

    // Create a promise-based version of fs.unlink
    const unlink = util.promisify(fs.unlink);

    // Delete the original file
    await unlink(filename);

    // Read the image file and return the data
    return fs.readFileSync(newFilename);
}

export const generateImage = async (baseCat: string, traitsRecord: TraitsRecordItem)  : Promise<Buffer> => {
    let formdata = new FormData();
    console.log(`traitsRecord is: ${JSON.stringify(traitsRecord)}`);
    // Create a prompt from the traitValues
    let prompt = `A pixelated image${traitsRecord?.personality ? ' with ' + traitsRecord.personality : ''}${traitsRecord?.eye ? ' with ' + traitsRecord.eye + ' eyes' : ''}${traitsRecord?.tail ? ' and a ' + traitsRecord.tail + ' tail' : ''}${traitsRecord?.wearing ? ', wearing ' + traitsRecord.wearing : ''}${traitsRecord?.activity ? ', is ' + traitsRecord.activity : ''}${traitsRecord?.environment ? ' ' + traitsRecord.environment : ''}`;    console.log(`prompt is: ${prompt}`);
    formdata.append("prompt", prompt);

    const response = await generateImageFromPrompt(baseCat, prompt);
    return response;
}

// Usage
// call async function here to execute it via npx ts-node src/genai/imagineart/remix-image-v2.ts
// Output: 200 OK

// (async () => {
//     try {
//         const traitsRecord: TraitsRecordItem = {
//             personality: "Jolly",
//             eye: "Flame",
//             tail: "long",
//             wearing: "Spectacles",
//             activity: "Playing",
//             environment: "On Snow",
//         };
//         await generateImage(traitsRecord);
//         //console.log(`response data is: ${JSON.stringify(responseData)}`);
//     } catch (error) {
//         console.error(error);
//     }
// })();
