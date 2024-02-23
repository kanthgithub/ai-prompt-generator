// Pre requisite
// npm install api --save

const sdk = require('api')('@scenario-api/v1.0#d405nglrt0dyki');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
// const Buffer = require('buffer');

const modelId = 'WMFVfL6ASISizG1T7X2NNw'; // It's one of our signature public models 

const key = process.env.SCENARIO_KEY;
const secret = process.env.SCENARIO_SECRET;

const encoded = Buffer.from(`${key}:${secret}`).toString('base64');

// Read the image file
const imageBuffer = fs.readFileSync('./base/image.png');

// Convert the image to a base64 string
const base64Image = imageBuffer.toString('base64');
var dataUrl = 'data:image/png;base64,' + base64Image;
sdk.auth(`Basic ${encoded}`);
sdk.postModelsInferencesByModelId({
    parameters: {
      type: 'img2img',
      prompt:
        'wearing a helmet and neck chain',
      image: dataUrl,
      numInferenceSteps: 30,
      numSamples: 2,
      guidance: 7.5,
      width: 512,
      height: 512,
      negativePrompt: 'ugly, bad, low quality, blurry',
    }
}, { modelId: modelId })
    .then(({ data }) => {
        console.log(data);
        const inferenceId = data.inference.id;
        console.log(`inferenceId is: ${inferenceId}`);
    })
    .catch(err => console.error(err));