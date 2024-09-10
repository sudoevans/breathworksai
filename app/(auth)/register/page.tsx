'use client'
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { SubmitButton } from '@/app/components/submit-button';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';


export default function Signup() {
  
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [sayName, setSayName] = useState('')
  const router = useRouter()

  const session = useSession()

  console.log(session)

  async function register(evt: FormEvent<HTMLElement>) {
    evt.preventDefault()
    try{
      const response = await axios.post('/api/register', {name, email, password, language})
    //   if(response){
    //   signIn("credentials", 
    //     {
    //       email: response.data.data.email,
    //       password: password,
    //       redirect: false,
    //       callbackUrl: "/"
    //     }
    //   ).then((callback) => {
    //     if(callback.ok){
    //       console.log("Ok")
    //     }
    //   })
    // }
    if (response.status === 201){
      router.push('/home/create')
    }
    }catch (error){
      console.log(error)
    }

    
  }

  return (
    <>
    <div className="z-10 mt-8 w-full mx-auto max-w-md px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Create an account</h2>
        <form
        onSubmit={register}
          className="flex flex-col space-y-4"
        >
          <div className="bg-white rounded-lg p-4 mb-2">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={evt => setName(evt.target.value)}
                placeholder="Name"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <select
                name="language"
                value={language}
                onChange={evt => setLanguage(evt.target.value)}
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="sv">Swedish</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={evt => setEmail(evt.target.value)}
                placeholder="Email"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={evt => setPassword(evt.target.value)}
                placeholder="Password"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <p className="text-center text-sm text-purple-600">
              <Link href="/login">Already registered? Log in.</Link>
            </p>
          </div>
          <div className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              name="sayName"
              id="sayName"
              value={sayName}
              onChange={evt => setSayName(evt.target.value)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="sayName" className="text-gray-300">
              Say my name in the journey.
            </label>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Note: name pronunciation is still in beta. You can go back and uncheck this box
          </p>
          <SubmitButton className="w-full py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-purple-100 transition duration-300">
            Let&apos;s Go
          </SubmitButton>
      </form>
      
    </div>
   
    </>
  );
}