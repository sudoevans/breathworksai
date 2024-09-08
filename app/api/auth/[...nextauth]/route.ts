// import { db } from '@/lib/db';
// import { NextResponse } from 'next/server';

// async function POST(req: Request) {
//     try {
//         const { email, name, password, language } = await req.json()
//         const existingUser = await db.user.findFirst({
//             where: {
//                 email
//             }
//         })

//         // check if user already exists

//         if (existingUser) {
//             return NextResponse.json({
//                 user: null,
//                 message: 'User with this email already exists'
//             }, {status:  409})
//         }

//         return NextResponse.json({email, name, language})
//     } catch (error: any) {
//         console.log('An Error occured')
//     }
// }
export { GET, POST } from 'app/auth';
