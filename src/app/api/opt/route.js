import connectionToDB from "@/utiles/DB/connection"
import { sendOtpValidator } from "../../../../validators/backend/optValidator"
import otpModel from "../../../../model/opt";

export async function POST(req){
    const API_KEY = "pQG2pGhmXjSpfAH33mBArltQcAS4cT7QSMyE1exDRtbeJvMu52";
    const PATTERN_CODE = "OsPZ9F2z8l";
    const FROM_NUMBER = "90008361";
    try{
    const {phone} = await req.json()
    const isValidPhoneNumber = sendOtpValidator({phone})
    console.log(isValidPhoneNumber);
    if(isValidPhoneNumber === true){
        const verificationCode = Math.floor(Math.random() * 90000) + 10000;
          const requestBody = {
          code: PATTERN_CODE,
          attributes: {
            code: verificationCode,         
          },
          recipient: phone,
          line_number: FROM_NUMBER,
          number_format: "english",
        };
        try{
            const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Api-Key": API_KEY,
                  Accept: "application/json",
                },
                body: JSON.stringify(requestBody),
            })
                
            if(res.ok){
                connectionToDB()
                const expTime = new Date();
                await otpModel.create({
                    phone , code : verificationCode , expTime
                })
                return Response.json("message sent successfully" ,{ status: 200})
            }
        }catch(err){
            return Response.json("pleas try agein leiter" , {status:500})
        }
    }else{        
        return Response.json("bad request" , {status:400})
    }
    }
    catch(err){
        console.log(err);
    }
}