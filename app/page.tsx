import React from 'react';
import Link from 'next/link';
import Logo from './components/Logo';

export default function BreathworkLandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/space-background.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="z-10 w-full max-w-2xl px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Logo>
          </Logo>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl font-bold mb-4">Personalized Breathwork</h2>
        
        {/* Subheading */}
        <p className="text-lg mb-8 text-gray-300">
          Personalized breathwork sessions tailored to help make you sleep better, reduce stress and boost overall well being.
        </p>

        {/* Buttons */}
        <div className="space-y-4 mb-16">
          <Link href="/try-for-free" className="block w-full bg-white text-purple-900 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Try for free
          </Link>
          <Link href="/login" className="block w-full bg-transparent border border-white text-white py-3 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition duration-300">
            Log in
          </Link>
        </div>

        {/* Change Your Life Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Change your life</h2>
          <p className="text-lg mb-8 text-gray-300">
            Breath work can significantly reduce stress and improve mental clarity by promoting relaxation and enhancing focus. Incorporating personalized breathing exercises into your daily routine can lead to better emotional wellbeing and overall health.
          </p>
          <Link href="/try-for-free" className="inline-block bg-white text-purple-900 py-3 px-8 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Try for free
          </Link>
        </div>
      </div>
    </div>
  );
}