'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { SubmitButton } from '@/app/components/submit-button';
import Logo from '../../components/Logo';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/app/lib/auth';

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        // callbackUrl
      })
      console.log('Res', res)
      if (!res?.error) {
        // router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
  }
  return (

      <div className="z-10 mt-8 w-full mx-auto max-w-md px-4 text-center">

        <h2 className="text-3xl font-bold mb-8">Log in</h2>

        <form
          onSubmit={onSubmit}
          className="flex flex-col space-y-4"
        >
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="mb-4">
              <input
                type="email"
                value={email}
          onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"
                className="w-full p-2 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
          onChange={(e) => setPassword(e.target.value)}
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
