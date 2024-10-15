/* eslint-disable prettier/prettier */
import axios from 'axios';
import { ConfigModule } from '@nestjs/config';
console.log( process.env.api_secret)

export async function checkQuizResponse(quizz) {
    await ConfigModule.forRoot();
    const response = await axios.post(`${process.env.AI_Api_Url}`,quizz);
    if(response.status >= 200 && response.status <300){ 
      return response;
    }
    throw new Error("Error from ai");
}

export async function quranSpeachToText(audioUrl:string) {
   try{
    // await ConfigModule.forRoot();
    console.log(process.env.AI_Api_Url)
    const response = await axios.post(`[::1]:8000/api/v1/quran_recognition/url`, {
        audioUrl:audioUrl
    });

    console.log(response.status)
    if(response.status >= 200 && response.status <300){ 
      return response;
    }
   }catch(err){
    throw err;
   }

}