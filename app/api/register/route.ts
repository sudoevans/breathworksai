import { db } from "@/app/lib/db"
import { hash } from "bcrypt-ts"
import { signIn } from "next-auth/react"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
    
    const body = await request.json()

    const {name, email, password, language} = body

    const existingEmail = await db.user.findFirst({
      where: {
        email
      }
    })

    if (existingEmail){
      return NextResponse.json({
        message: "User already Exists",
        data: null
      }, {status: 409});
    }

    const hashPwd = await hash(password, 10)

    const user = await db.user.create({
        data: {
          name,
          email,
          password: hashPwd,
          language
        }
    })

    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: "/"
    })

    delete user.password

    if(response.ok){
      return NextResponse.json({
        message: "User created Successfully",
        data: user
      }, {status: 201})
    }
    return NextResponse.json({
      message: "Something went wrong",
      data: null
    }, {status: 500});
}