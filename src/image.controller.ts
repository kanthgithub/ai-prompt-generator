import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { generateImage } from './genai/imagineart/remix-image-v2';
import { TraitsRecordItem } from './genai/types';

@Controller('image')
export class ImageController {
    @Post()
    async getImage(@Res() res: Response, @Body() body: { basecat: string, traitsRecord: TraitsRecordItem }){
        const image = await generateImage(body.basecat, body.traitsRecord);
        console.log(`image generated`);
        res.setHeader('Content-Type', 'image/png');
        res.send(image);
    }
}