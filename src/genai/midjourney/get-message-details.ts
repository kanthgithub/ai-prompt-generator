import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const getMessageDetails = async (messageId: string) => {
    const config = {
        method: "get",
        url: `https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`,
        headers: {
          Authorization: `Bearer ${process.env.MIDJOURNEY_API_KEY}`,
        },
      }

    const response = await axios(config);

    //check for response status
    if (response.status !== 200) {
        console.log(`response status: ${response.status}`);
        throw new Error('Failed to generate image');
    }

    return response.data;
}

// Usage
// call async function here to execute it via npx ts-node src/genai/midjourney/get-message-details.ts
// Output: 200 OK

(async () => {
    try {
        //9e01f78c-6595-446d-8053-77a86f4b2c0f
        let messageId = '1c5a1f98-95a2-48c9-b71f-e1c6576bd228';
        let responseData = await getMessageDetails(messageId);
        console.log(`response data for messageId ${messageId} is: ${JSON.stringify(responseData)}`);

        // messageId = '9e01f78c-6595-446d-8053-77a86f4b2c0f';
        // responseData = await getMessageDetails(messageId);
        // console.log(`response data for messageId ${messageId} is: ${JSON.stringify(responseData)}`);

    } catch (error) {
        console.error(error);
    }
})();