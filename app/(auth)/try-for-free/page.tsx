"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from 'utils/localStorage';

export default function TryForFree() {
  const [name, setName] = useState<string>('')
  const [language, setLanguage] = useState<string>('en')
  const [sayName, setSayName] = useState(false)
  const  [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const router = useRouter()

  const handleFreeTrySubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoading(true)
    if (name?.length && language){
      saveToLocalStorage('selections', {name, language, sayName: sayName})
      setLoading(false)
      router.push('/home/create')
    }else {
      setErrorMsg(true)
    }
  }

  useEffect(() => {
    let timeout
    if(errorMsg){
      timeout = setTimeout(() => {
        setErrorMsg(false)
      }, 2000)
    }
  }, [errorMsg])
  
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
            {/* error message */}
            {
              errorMsg && (
                <p className='w-full text-red-600 text-left'>Please Fill all fields</p>
              )
            }

        {/*  Checkbox*/}
        <div className="py-4">
            <label className="flex gap-x-2 items-start text-white-700">
              <input
                type="checkbox"
                name="sayName"
                className="mt-1 cursor-pointer"
                checked={sayName}
                onChange={() => setSayName(!sayName)}
              />
              <span className="text-sm text-left">
                Say my name in the journey. Note! name pronunciation is still in beta. You can go back and uncheck this box.
              </span>
            </label>
          </div>
        
        {/* Lets Go Button */}
        <button
          type="submit"
          className="w-full bg-white text-black disabled:cursor-not-allowed py-3 rounded-full font-semibold hover:bg-purple-900 transition duration-300"
        >
          {
            loading ? "Loading..." : "Lets Go"
          }
        </button>
        </form>
      </div>

  );
}