import React from 'react';
import Link from 'next/link';
import { signIn } from 'app/auth';
import { SubmitButton } from '@/app/components/submit-button';
import Logo from '../../components/Logo';

export default function Login() {
  return (

      <div className="z-10 mt-8 w-full max-w-md px-4 text-center">

        <h2 className="text-3xl font-bold mb-8">Log in</h2>

        <form
          action={async (formData: FormData) => {
            'use server';
            await signIn('credentials', {
              redirectTo: '/protected',
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            });
          }}
          className="flex flex-col space-y-4"
        >
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <p className="text-center text-sm text-purple-600">
              <Link href="/register">New user? Click here to create an account.</Link>
            </p>
          </div>
          <SubmitButton className="w-full bg-white text-purple-900 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Lets Go
          </SubmitButton>
        </form>
      </div>
  );
}
