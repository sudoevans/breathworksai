import React from 'react'
import Logo from '../components/Logo'
import Link from 'next/link'

const page = () => {
  return (
    <div className='px-6 mt-8'>

        {/* Main Heading */}
        <h2 className="text-4xl font-semibold tracking-wide leading-[2.8rem] mb-4">Personalized Breathwork</h2>
        
        {/* Subheading */}
        <p className="text-lg mb-8 text-gray-300">
          Personalized breathwork sessions tailored to help make you sleep better, reduce stress and boost overall well being.
        </p>

        {/* Buttons */}
        <div className="space-y-4 mb-16">
          <Link href="/try-for-free" className="cursor-pointer block w-full bg-white text-2xl text-[#0A0A0B] py-3.5 rounded-full font-bold hover:bg-opacity-85 transition duration-300">
            Try for free
          </Link>
          <Link href="/login" className="cursor-pointer block w-full bg-transparent border border-white text-white py-3.5 text-2xl rounded-full font-bold hover:bg-white hover:bg-opacity-85 hover:text-[#0A0A0B] transition duration-300">
            Log in
          </Link>
        </div>

        {/* Change Your Life Section */}
        <div className='px-5'>
          <h2 className="text-5xl font-medium leading-[4rem] text-center tracking-[0.08em] mb-4">Change your life</h2>
          <p className="text-lg mb-8 text-gray-300">
            Breath work can significantly reduce stress and improve mental clarity by promoting relaxation and enhancing focus. Incorporating personalized breathing exercises into your daily routine can lead to better emotional wellbeing and overall health.
          </p>
          <Link href="/try-for-free" className="cursor-pointer block w-full bg-white text-2xl text-[#0A0A0B] py-3.5 rounded-full font-bold hover:bg-opacity-85 transition duration-300">
            Try for free
          </Link>
        </div>
 
    </div>
  )
}

export default page