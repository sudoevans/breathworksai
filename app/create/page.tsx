import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, User, Smile } from 'lucide-react';
import Image from 'next/image';
import { auth, signOut } from 'app/auth';


const guides = [
  { name: 'Christopher', image: '/images/GUIDE_christopher.png' },
  { name: 'Amelia', image: '/images/GUIDE_amelia.png' },
  { name: 'Jenny', image: '/images/GUIDE_jenny.png' },
  { name: 'Ryan', image: '/images/GUIDE_ryan.png' },

];


const musicOptions = ['Space', 'Hip hop', 'Techno'];
const purposeOptions = ['Be happy', 'Focus', 'Sleep better'];

export default function BreathworkSessionCreator() {
  const [activeGuide, setActiveGuide] = useState(1);
  const [selectedMusic, setSelectedMusic] = useState('Space');
  const [selectedPurpose, setSelectedPurpose] = useState('Focus');
  const [progress, setProgress] = useState(40);

  const handlePrevGuide = () => {
    setActiveGuide((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const handleNextGuide = () => {
    setActiveGuide((prev) => (prev === guides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/space-background.mov" type="video/mov" />
      </video>

      {/* Content */}
      <div className="z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Home className="text-purple-500" size={24} />
          <h1 className="text-xl font-semibold text-center">
            Create your personal<br />Breathwork session
          </h1>
          <User className="text-purple-500" size={24} />
        </div>

        {/* Guide Selection */}
        <div className="mb-8">
          <h2 className="text-lg mb-4 flex items-center">
            <Smile className="mr-2 text-purple-500" size={20} />
            1. Select Voice
          </h2>
          <div className="relative flex justify-center items-center">
            <button onClick={handlePrevGuide} className="absolute left-0 z-10">
              <ChevronLeft className="text-purple-500" size={24} />
            </button>
            <div className="flex space-x-4 overflow-hidden">
              {guides.map((guide, index) => (
                <div
                  key={guide.name}
                  className={`w-24 h-24 rounded-full overflow-hidden transition-opacity duration-300 ${
                    index === activeGuide ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover"
                  />


                </div>
              ))}
            </div>
            <button onClick={handleNextGuide} className="absolute right-0 z-10">
              <ChevronRight className="text-purple-500" size={24} />
            </button>
          </div>
          <p className="text-center mt-2">{guides[activeGuide].name}</p>
          <p className="text-center text-sm text-gray-400">
            {guides[activeGuide].name} is our most popular guide
          </p>
        </div>

        {/* Music Selection */}
        <div className="mb-8">
          <h2 className="text-lg mb-4 flex items-center">
            <svg className="mr-2 text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            2. Select Music
          </h2>
          <div className="flex space-x-2">
            {musicOptions.map((music) => (
              <button
                key={music}
                onClick={() => setSelectedMusic(music)}
                className={`px-4 py-2 rounded-full ${
                  selectedMusic === music
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-200 bg-opacity-20 text-purple-300'
                }`}
              >
                {music}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Gives you energy boost and the strength to fight.
          </p>
        </div>

        {/* Purpose Selection */}
        <div className="mb-8">
          <h2 className="text-lg mb-4 flex items-center">
            <svg className="mr-2 text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            3. Select Purpose
          </h2>
          <div className="flex space-x-2">
            {purposeOptions.map((purpose) => (
              <button
                key={purpose}
                onClick={() => setSelectedPurpose(purpose)}
                className={`px-4 py-2 rounded-full ${
                  selectedPurpose === purpose
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-200 bg-opacity-20 text-purple-300'
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Gives you energy boost and the strength to fight.
          </p>
        </div>

        {/* Create Button */}
        <button className="w-full bg-white text-purple-900 py-3 rounded-full font-semibold mb-4">
          Create
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}