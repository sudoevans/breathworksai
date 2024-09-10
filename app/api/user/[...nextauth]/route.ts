import { db } from "@/app/lib/db";
import { hash } from "bcrypt-ts";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try{
      const body = await  req.json();
      const {email, password, name, language, say_name} = body

      const existingEmail = db.user.findFirst({
        where: {
          email: email
        }
      })
      if (existingEmail){
        return NextResponse.json({
          data: null,
          message: "User with email already exists"
        }, {
          status: 409
        })
      }

      const hashPwd = await hash(password, 10)
        const newUser = await db.user.create({
          data:  {
            email,
            password: hashPwd,
            language,
            name,
            say_name
          }
      })
      delete (await newUser).password
      return NextResponse.json({
        data: newUser,
        message: "User created Succefully"
      }, {
        status: 201
      })
    }catch(error: any){
      console.log(error)
      return NextResponse.json({
        messae: "Something went wrong. Please try again later!",
        data: null
      }, {status: 500})
    }
}