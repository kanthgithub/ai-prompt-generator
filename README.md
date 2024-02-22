## Build

```sh
yarn install
```

## Environment Setup

```sh
cp .env.example .env
```

- Add APIKeys of imagine.art and midjourney

## Generate Images 

### imagineart

1. script to generate using imagine.art is in directory:
[generate-image](./src/genai/imagineart/generate-image.ts)

2. script to remix on existing base image is:
[remix-image](./src/genai/imagineart/remix-image-v2.ts)

### midjourney

1. script to generate image via prompt and reference image
[generate-image](./src/genai/midjourney/generate-image.ts)
```sh
npx ts-node src/genai/midjourney/generate-image.ts
```

2. script to query and get the response of midjourney
 - capture the messageId from the response of step-1
 - paste the messageId in the script for `get-message-details`
   [get-message-details](./src/genai/midjourney/get-message-details.ts)

 - run command:
 ```sh
  npx ts-node src/genai/midjourney/get-message-details.ts 
 ``` 

 - The message details should contain hyperlink/URL to the generated image


 ### How to run via API

 1. nestJS API has POST-API endpoint to take `reference image-name` and `traits` as message-body

 2. usage of API:

 - start the service

 ```sh
 yarn start:dev
 ```

 - Open Postman client and create a POST request with:

 URL: http://localhost:3000/image

 Request Body:

 ```js
{
  "basecat": "new-cat",
  "traitsRecord": {
    "personality": "",
    "eye": "",
    "tail": "",
    "wearing": "sun glasses",
    "activity": "",
    "environment": "on the snow"
    }
}
```

- reference values for the traits can be open, i.e you can fill them as per your imagination

- API at moment uses the imagine-art AI