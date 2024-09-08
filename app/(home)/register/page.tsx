import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from '@/app/components/submit-button';


export default function Signup() {

  async function register(formData: FormData) {
    'use server';
    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let language = formData.get('language') as string;
    let sayName = formData.get('sayName') === 'on';

    let user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists'; // TODO: Handle errors with useFormStatus
      
    } else {
      await createUser(name, email, password, language, sayName);
      redirect('/login');
    }
  }

  return (
    <>
    <div className="z-10 mt-8 w-full max-w-md px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Create an account</h2>

        <form
          action={register}
          className="flex flex-col space-y-4"
        >
          <div className="bg-white rounded-lg p-4 mb-2">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <select
                name="language"
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
                placeholder="Email"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
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
            Let's Go
          </SubmitButton>
          
      </form>
      
      
    </div>
   
    </>
  );
}