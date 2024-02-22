import { TraitsRecordItem } from "src/genai/types";
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';
import gm from 'gm';
import dotenv from 'dotenv';
dotenv.config();

// shrodinger cat with jolly face and bespectable eyes and sky blue background with 300x300 resolution, limited palette with blocky pixels --s {10, 30, 60, 90} --no details

export const generateImage = async (traitsRecord?: TraitsRecordItem) => {
    let formdata = new FormData();
    let prompt = `A pixelated cat for an nft-collection, with ${traitsRecord?.personality} with ${traitsRecord?.eye ? traitsRecord.eye + ' eyes' : ''}${traitsRecord?.tail ? ' and a ' + traitsRecord.tail + ' tail' : ''}${traitsRecord?.wearing ? ', wearing ' + traitsRecord.wearing : ''}${traitsRecord?.activity ? ', is ' + traitsRecord.activity : ''}${traitsRecord?.environment ? ' ' + traitsRecord.environment : ''}.`;
    formdata.append("prompt", prompt);
    formdata.append("style_id", "122");
    formdata.append("cfg", "11.5");
    formdata.append("seed", "1000");
    formdata.append("steps", "30");

    let requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
            ...formdata.getHeaders(),
            "Authorization": `Bearer ${process.env.IMAGINE_ART_API_KEY}`
        }
    };

    const response = await fetch("https://api.vyro.ai/v1/imagine/api/generations", requestOptions);

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
    const filename = `cat_generated_${timestamp}.jpeg`;

    // Write the binary data to a JPEG file
    fs.writeFileSync(filename, responseData);

    const resizedFilename = `cat_generated_${timestamp}_resized.jpeg`;

    // Resize the image to 300x300 pixels and overwrite the original file
    gm(filename)
    .resize(300, 300)
    .write(resizedFilename, (err) => {
      if (err) console.error(err);
    });


}

// Usage
// call async function here to execute it via npx ts-node src/genai/imagineart/generate-image.ts
// Output: 200 OK

(async () => {
    try {
        await generateImage();
        //console.log(`response data is: ${JSON.stringify(responseData)}`);
    } catch (error) {
        console.error(error);
    }
})();