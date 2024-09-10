'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// import { useSession } from 'next-auth/react';

import { ClientWrapper } from '../components/ClientWrapper';
import { useRouter } from 'next/navigation';

type Voice = 'Ryan' | 'Jenny' | 'Amelia';
type Music = 'Space' | 'Hip hop' | 'Techno';
type Purpose = 'Space' | 'Be happy' | 'Focus';

const BreathworkSession: React.FC = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();
  
  const [selectedVoice, setSelectedVoice] = useState<Voice>('Ryan');
  const [selectedMusic, setSelectedMusic] = useState<Music>('Hip hop');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>('Be happy');
  const [progress, setProgress] = useState<number>(0);

  const audioRef = useRef<any | null>(null);

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

  const handleVoiceChange = (voice: Voice) => {
    setSelectedVoice(voice);
  };

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

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return null; // Or a placeholder indicating no access
  // }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="/videos/galaxy_background.mp4" type="video/mp4" />
      </video>
      
      <div className="z-10 w-full max-w-md p-6 space-y-8">
        <h1 className="text-2xl font-bold text-center">Create your personal Breathwork session</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl mb-2">1. Select Voice</h2>
            <div className="flex justify-between">
              {['Ryan', 'Jenny', 'Amelia'].map((voice) => (
                <div
                  key={voice}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    selectedVoice === voice ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => handleVoiceChange(voice as Voice)}
                >
                  <Image
                    src={`/images/${voice.toLowerCase()}.png`}
                    alt={voice}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
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
            <p className="text-center mt-2">Gives you energy boost and the strength to fight.</p>
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

export default function GenerateAudioPage() {
  return (
    <ClientWrapper>
      <BreathworkSession />
    </ClientWrapper>
  );
}
