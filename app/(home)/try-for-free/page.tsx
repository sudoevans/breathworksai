"use client"
import React, { FormEvent, useState } from 'react';
import Logo from '../../components/Logo';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from '../../../utils/localStorage';
import ProfileIcon from '@/app/assets/ProfileIcon';
import GlobeIcon from '@/app/assets/GlobeIcon';

export default function TryForFree() {
  const [name, setName] = useState<string | null>()
  const [language, setLanguage] = useState<string>('English')
  const [checkedName, setCheckedName] = useState(false)
  const router = useRouter()

  const handleFreeTrySubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    saveToLocalStorage('selections', {name, language});
    console.log("Pushed", checkedName, name?.length)
    if ((checkedName && !!name?.length) || !checkedName){
      console.log("Pushed", checkedName, name?.length)
      router.push('/create');
    }
  }
  
  return (
    <div className='px-4 mt-2'>

        <h2 className="text-4xl font-semibold tracking-wide leading-[2.8rem] mb-8">Try for free</h2>

        <form
          onSubmit={handleFreeTrySubmit}
        >
          <div className="bg-white text-left rounded-lg py-4 space-y-3 px-4 mb-4">

          
          <div className="font-light text-black flex items-center gap-x-3">
            <ProfileIcon className="mt-3 w-fit h-4"/>
              <input
                type="text"
                name="name"
                onChange={evt => setName(evt.target.value)}
                placeholder="Name"
                className="w-full mt-1 p-2 border-b border-gray-700 focus:outline-none focus:border-black"
                required={checkedName}
              />
          </div>
          <div className="font-light text-black flex items-center gap-x-3">
            <GlobeIcon className="mt-3 w-fit h-4"/>
              <select
                name="language"
                value={language}
                onChange={(evt) => setLanguage(evt.target.value)}
                className="w-full mt-1 p-2 border-gray-700 border-b focus:outline-none focus:border-black"
                required
              >
                <option value="English">English</option>
                <option value="Swedish">Swedish</option>
              </select>
          </div>
          </div>

        {/*  Checkbox*/}
        <div className="my-9 flex gap-x-2 items-start text-white-700">
              <input
                type="checkbox"
                name="sayName"
                className="mt-2"
                checked={checkedName}
                onChange={() => setCheckedName(!checkedName)}
              />
              <span className="leading-6 font-light text-left">
                Say my name in the journey. Note! name pronunciation is still in beta. You can go back and uncheck this box.
              </span>
          </div>
        
        {/* Lets Go Button */}
        <button
          type="submit"
          disabled={checkedName ? !name?.length : false}
           className="cursor-pointer block w-full bg-white text-2xl text-[#0A0A0B] py-3.5 disabled:cursor-not-allowed rounded-full font-bold hover:bg-opacity-85 transition duration-300"
        >
          Lets Go
        </button>
        </form>
    </div>
  );
}
