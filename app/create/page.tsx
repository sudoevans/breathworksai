'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swiper from 'swiper';
import SwiperCore from 'swiper';
import   { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define types for our selections
type Voice = 'Ryan' | 'Jenny' | 'Amelia';
type Music = 'Space' | 'Hip hop' | 'Techno';
type Purpose = 'Space' | 'Be happy' | 'Focus';

const guides = [
  {
    name: 'Jenny',
    image: 'https://via.placeholder.com/150', // Replace with actual image
    description: 'Jenny is our most popular guide',
  },
  {
    name: 'John',
    image: 'https://via.placeholder.com/150', // Replace with actual image
    description: 'John will guide you through the best sessions',
  },
  {
    name: 'Sara',
    image: 'https://via.placeholder.com/150', // Replace with actual image
    description: 'Sara helps you find your purpose',
  },
];

const BreathworkSession: React.FC = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();
  
  const [selectedVoice, setSelectedVoice] = useState<Voice>('Ryan');
  const [selectedMusic, setSelectedMusic] = useState<Music>('Hip hop');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>('Be happy');
  const [progress, setProgress] = useState<number>(0);
  const [position, setPosition] = useState(2); // default selected position

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const swiper = new Swiper(
    '.swiper', {
  modules: [Navigation, Pagination],
    }
  )

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [status, router]);

  useEffect(() => {
    // Play sample audio when voice changes
    if (audioRef.current) {
      audioRef.current.src = `/audio/${selectedVoice.toLowerCase()}_sample.mp3`;
      audioRef.current.play();
    }
  }, [selectedVoice]);

  // const handleVoiceChange = (voice: Voice) => {
  //   setSelectedVoice(voice);
  // };

  const handleMusicChange = (music: Music) => {
    setSelectedMusic(music);
  };

  const handlePurposeChange = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleCreate = () => {
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };


  const voices = ['Ryan', 'Jenny', 'Amelia'];

  const handleVoiceChange = (voice: any, index: any) => {
    setSelectedVoice(voice);
    setPosition(index + 1);
  };

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return null;
  // }
  

  return (
    <div className="relative min-h-screen text-white flex flex-col pt-[5vh] items-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/space-background.mp4" type="video/mp4" />
      </video>
      
      <div className="z-10 w-full max-w-md p-6 space-y-8">
        <h1 className="text-2xl font-bold text-center">Create your personal Breathwork session</h1>
        
        <div className="space-y-3">
          <div>
            <div className='w-fit mx-auto'>
              <h2 className="text-xl mb-2">1. Select Voice</h2>
            </div>
            
            <div className="grid h-[20rem] mt-[6rem] grid-cols-5 items-center justify-items-center grid-rows-2">
      {/* Radio Buttons */}
      <input
        type="radio"
        name="position"
        className='w-4 h-4 cursor-pointer'
        checked={position === 1}
        onChange={() => setPosition(1)}
      />
      <input
        type="radio"
        name="position"
        className='w-4 h-4 cursor-pointer'
        checked={position === 2}
        onChange={() => setPosition(2)}
      />
      <input
        type="radio"
        name="position"
        className='w-4 h-4 cursor-pointer'
        checked={position === 3}
        onChange={() => setPosition(3)}
      />

      {/* Carousel */}
      <div id="carousel">
        {voices.map((voice, index) => (
          <div
            key={voice}
            className={`cursor-pointer transition-opacity duration-300 item ${
              selectedVoice === voice ? 'opacity-100' : 'opacity-50'
            }`}
            style={{
              '--position': position,
              '--offset': index + 1,
            } as React.CSSProperties}
            onClick={() => handleVoiceChange(voice, index)}
          >
            <img
              src={`/images/${voice.toLowerCase()}.png`}
              alt={voice}
              className="rounded-lg w-full h-full"
            />
          </div>
        ))}
        
      </div>
      
    </div>
    <div className='-mt-[2.5rem] mb-4 bg-purple-600 capitalize flex justify-center items-center w-[10rem] mx-auto py-2 rounded-full text-black font-semibold tracking-wider text-2xl'>{selectedVoice}</div>
            <p className="text-center mt-2">{selectedVoice} is our most popular guide</p>
          </div>

          <div>
            <h2 className="text-xl mb-2">2. Select Music</h2>
            <div className="flex justify-between">
              {['Space', 'Hip hop', 'Techno'].map((music) => (
                <button
                  key={music}
                  className={`px-4 py-2 rounded-lg transition-opacity duration-300 ${
                    selectedMusic === music ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                  onClick={() => handleMusicChange(music as Music)}
                >
                  {music}
                </button>
              ))}
            </div>
            <p className="text-center mt-2">Gives you energy boost and the strength to fight.</p>
          </div>

          <div>
            <h2 className="text-xl mb-2">3. Select Purpose</h2>
            <div className="flex justify-between">
              {['Space', 'Be happy', 'Focus'].map((purpose) => (
                <button
                  key={purpose}
                  className={`px-4 py-2 rounded-lg transition-opacity duration-300 ${
                    selectedPurpose === purpose ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                  onClick={() => handlePurposeChange(purpose as Purpose)}
                >
                  {purpose}
                </button>
              ))}
            </div>
            <p className="text-center">Gives you energy boost and the strength to fight.</p>
          </div>
        </div>

        <button
          className="w-full bg-white text-purple-800 py-2 rounded-lg font-bold"
          onClick={handleCreate}
        >
          Create
        </button>

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default BreathworkSession;