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
sdk.auth(`Basic ${encoded}`);

const getInferenceDetails = async (modelId, inferenceId) => {
    const { data: inferenceData } = await sdk.getModelsInferencesByModelIdAndInferenceId({ modelId, inferenceId });
    console.log(`Inference data: ${JSON.stringify(inferenceData)}`);
    return inferenceData;
}

const pollInferenceStatus = async (modelId, inferenceId) => {
    let status;
    do {
        // Fetch the inference details
        const { data: inferenceData } = await sdk.getModelsInferencesByModelIdAndInferenceId({ modelId, inferenceId });
        console.log(`Inference data: ${JSON.stringify(inferenceData)}`);
        status = inferenceData.status;
        console.log(`Inference status: ${status}`);
        
        // Wait for a certain interval before polling again
        await new Promise(resolve => setTimeout(resolve, 5000)); // Polling every 5 seconds
    } while (status !== 'succeeded' && status !== 'failed');

    // Handle the final status
    if (status === 'succeeded') {
        console.log('Inference succeeded!');
        console.log(inferenceData); // Print inference data
    } else {
        console.log('Inference failed!');
    }
}

//node src/scenario/get-img.js
 ( async () => {
    await pollInferenceStatus(modelId, 'inf_QUdAHPzxctJKHdbMjCUh2rn8');
}
)();