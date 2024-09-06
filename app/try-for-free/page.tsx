"use client"
import React, { FormEvent, useState } from 'react';
import Logo from '../components/Logo';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from '../../utils/localStorage';

export default function TryForFree() {
  const [name, setName] = useState<string | null>()
  const [language, setLanguage] = useState<string>('English')
  const router = useRouter()

  const handleFreeTrySubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    saveToLocalStorage('selections', {name, language})
    name?.length && router.push('/create')
  }
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center pt-[5vh] relative overflow-hidden">
      {/* Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/space-background.mp4" type="video/mp4" />
      </video>

      {/* Contents */}
      <div className="z-10 w-full max-w-md px-4 text-center space-y-4">
        {/* Logo */}
        <div className="">
          <Logo /> {/* Use the Logo component */}
        </div>

        <h2 className="text-3xl font-bold py-3.5 md:py-6">Try for free</h2>

        <form
          onSubmit={handleFreeTrySubmit}
        >
          <div className="bg-white text-left rounded-lg p-4 mb-4">

          
          <div className="mb-4">
            <label className="block text-gray-700">
              <span className="text-sm font-semibold">Name</span>
              <input
                type="text"
                name="name"
                onChange={evt => setName(evt.target.value)}
                placeholder="Name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <span className="text-sm font-semibold">Language</span>
              <select
                name="language"
                value={language}
                onChange={(evt) => setLanguage(evt.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                required
              >
                <option value="English">English</option>
                <option value="Swedish">Swedish</option>
              </select>
            </label>
          </div>
          </div>

        {/*  Checkbox*/}
        <div className="py-4">
            <label className="flex gap-x-2 items-start text-white-700">
              <input
                type="checkbox"
                name="sayName"
                className="mt-1"
              />
              <span className="text-sm text-left">
                Say my name in the journey. Note! name pronunciation is still in beta. You can go back and uncheck this box.
              </span>
            </label>
          </div>
        
        {/* Lets Go Button */}
        <button
          type="submit"
          disabled={!name?.length}
          className="w-full bg-white text-black disabled:cursor-not-allowed py-3 rounded-full font-semibold hover:bg-purple-900 transition duration-300"
        >
          Lets Go
        </button>
        </form>
      </div>
    </div>
  );
}
