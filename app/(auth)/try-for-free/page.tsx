"use client"
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from 'utils/localStorage';

export default function TryForFree() {
  const [name, setName] = useState<string | null>()
  const [language, setLanguage] = useState<string>('English')
  const router = useRouter()

  const handleFreeTrySubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    saveToLocalStorage('selections', {name, language})
    name?.length && router.push('/home/create')
  }
  
  return (
    <div className="z-10 mt-8 w-full mx-auto max-w-md px-4 text-center">
     
        <h2 className="text-3xl font-bold py-3.5 md:py-6">Try for free</h2>

        <form
          onSubmit={handleFreeTrySubmit}
        >
          <div className="bg-white text-left rounded-lg p-4 mb-4">

          
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

  );
}