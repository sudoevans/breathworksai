'use client'
import React, { useState, useEffect, useRef } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HomeIcon from '../../assets/HomeIcon';
import ProfileIcon from '../../assets/ProfileIcon';
import SmileyIcon from '../../assets/SmileyIcon';
import SoundIcon from '../../assets/SoundIcon';
import MusicIcon from '../../assets/MusicIcon';
import messages from '../../../sample-voice.json';
import { loadFromLocalStorage, saveToLocalStorage } from 'utils/localStorage';
import { replacePlaceholder } from 'utils/replacebuilder';
import { useSession } from 'next-auth/react';

// Define types for our selections
type Voice = 'Ryan' | 'Jenny' | 'Amelia' | 'Christopher';
type Music = 'Space' | 'Hip hop' | 'Techno';
type Purpose = 'Space' | 'Be happy' | 'Focus';

const tracks = [
  {
    label: 'hip hop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    label: 'focus',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    label: 'techno',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
];


const BreathworkSession: React.FC = () => {
  const router = useRouter();
  
  const [selectedVoice, setSelectedVoice] = useState<Voice>('Ryan');
  const [selectedMusic, setSelectedMusic] = useState<Music>('Hip hop');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>('Be happy');
  const [progress, setProgress] = useState<number>(0);
  const [position, setPosition] = useState(2);
  const {data: session} = useSession()
  const [guideAudios, setGuideAudios] = useState<Record<string, string>>({});

  const audioRef = useRef<any | null>(null);
  const musicRef = useRef<any | null>(null);
  const guideAudioRef = useRef<any | null>(null);


    // Preload all guide audios when the component mounts
  useEffect(() => {
    const preloadGuideAudios = async () => {
      const loadingQueue = Object.keys(JSON.parse(JSON.stringify(messages)))
      for (let voice of loadingQueue) {
        await preloadAudio(voice);
      }
    };
    preloadGuideAudios();
  }, []);


  // Preload individual guide audio
  const preloadAudio = async (voice: string) => {
    try {
      // get each model voice alterego
      const alterEgo = JSON.parse(JSON.stringify(messages))[voice]?.ego;

      // get each model's supposed message
      const parsedMessages = JSON.parse(JSON.stringify(messages));

      // replace placeholder text with individual's name or just skip if their preference is not to
    const newString = replacePlaceholder(parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'english'], loadFromLocalStorage('selections')?.name);
    // fetch  each voice
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newString, voice: `${alterEgo}` }),
      });

      // convert to blob for processing
      const file = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        // store each guides recording to a state
        setGuideAudios((prevAudios) => ({
          ...prevAudios,
          [voice]: reader.result as string,
        }));
      };
    } catch (error:any) {
      if (error.name === 'AbortError') {
        console.log(`Preload for ${voice} was aborted.`);
      } else {
        console.error(`Failed to preload audio for ${voice}:`, error);
      }
    }
  };


  useEffect(() => {
    // Play sample audio when voice changes
    if (audioRef.current) {
      audioRef.current.src = `/audio/jenny_sample.mp3`;
      // audioRef.current.play();
    }

  }, []);


  const handleMusicChange = (music: Music) => {
    setSelectedMusic(music);
    musicRef.current.src = tracks.find(item => item.label === music.toLowerCase()).url
    if(!!musicRef.current?.paused){
      musicRef.current.play()
    }else{
      musicRef.current.pause()
    }
    // console.log(tracks.find(item => item.label === music.toLowerCase()))
  };

  const handlePurposeChange = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleCreate = () => {
    // Simulate progress
    if(session){
      let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        router.push("/home/player")
      }
    }, 500);
    }else{
      router.push('/register')
    }
  };


  const voices = ['Christopher','Ryan', 'Jenny', 'Amelia'];

  const handleVoiceChange = (voice: any, index: any) => {
    guideAudioRef?.current?.pause()
    setSelectedVoice(voice);
    setPosition(index + 1);
    const parsedMessages = JSON.parse(JSON.stringify(messages));
    const newString = replacePlaceholder(parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'english'], loadFromLocalStorage('selections')?.name);

    // If audio for selected voice isn't preloaded yet, fetch it immediately
    if (!guideAudios[voice]) {
      setTimeout(() => {
      getElevenLabsResponse(newString);
    }, 300);
    } else {
      
      setTimeout(() => {
        playPreloadedAudio(guideAudios[voice]);
      }, 2000)
    }
    
  };

  // method to play selected audio voice
    const playPreloadedAudio = (audioSrc: string) => {
    if (guideAudioRef.current) {
      audioRef.current.play();
      guideAudioRef.current.src = audioSrc;
      guideAudioRef.current.playbackRate = 0.7
      guideAudioRef.current.play();
    }
  };


  // important to query selected voice if all voices have not been loaded yet
    const getElevenLabsResponse = async (text: string) => {
      const alterEgo = JSON.parse(JSON.stringify(messages))[selectedVoice]?.ego
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        voice: `${alterEgo}`
      })
    });

    const file = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (guideAudioRef.current) {
        guideAudioRef.current.src = reader.result as string;
        guideAudioRef.current.playbackRate = 0.7
        guideAudioRef.current.play();
      }
    }
  };

  const handleVoiceSelection = (voice) => {
    guideAudioRef.current?.pause()
    audioRef.current?.pause()
    // save selected voice to local storage
    saveToLocalStorage('audio', {"voice-guide": guideAudioRef.current.src, "name": selectedVoice})
  }
  

  return (
    <div className='pt-4 pb-[5rem] px-4'>
      <div className='w-full justify-between flex items-center'>
        <div className='border-[#9333ea] rounded-full w-fit border-[3px]'>
        <HomeIcon />
      </div>
      <div className='border-[#9333ea] p-1.5 rounded-full w-fit border-[3px]'>
        <ProfileIcon  className="fill-[#9333ea] w-5 h-5"/>
      </div>
      </div>
      
      <div className="z-10 w-full max-w-md p-6 mx-auto space-y-4">
        <h1 className="text-2xl font-medium text-center tracking-wide">Create your personal Breathwork session</h1>
        
        <div className="space-y-3">
          <div>
            <div className='w-fit flex items-center gap-x-4 mx-auto'>
              <div className='border-[#9333ea] rounded-full w-fit border-2'>
                <SmileyIcon/>
              </div>
              <h2 className="text-xl">1. Select Voice</h2>
            </div>
            
            <div className="grid h-[20rem] mt-[6rem] grid-cols-6 items-center justify-items-center grid-rows-2">
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

      <input
        type="radio"
        name="position"
        className='w-4 h-4 cursor-pointer'
        checked={position === 4}
        onChange={() => setPosition(4)}
      />

      {/* Carousel */}
      <div id="carousel">
        {voices.map((voice, index) => (
          <div
            key={voice}
            className={`cursor-pointer transition-opacity duration-300 border-0 rounded-lg item ${
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
              className="w-full border-0 h-full"
            />
          </div>
        ))}
        
      </div>
      
    </div>
    <div className='-mt-[2.5rem] mb-4 bg-purple-600 capitalize flex justify-center items-center min-w-[10rem] mx-auto py-2 rounded-full text-black w-fit font-semibold tracking-wider px-7 text-2xl' onClick={handleVoiceSelection}>{selectedVoice}</div>
            <p className="text-center mt-2 font-light tracking-wide text-lg">{selectedVoice} is our most popular guide</p>
          </div>

          <div className='pt-5 px-10 space-y-4'>
            <div className='w-fit flex items-center gap-x-4 mx-auto'>
              <div className='border-[#9333ea] rounded-full w-fit border-2'>
                <SoundIcon/>
              </div>
              <h2 className="text-xl mb-2">2. Select Music</h2>
            </div>
            
            <div className="flex justify-between">
              {['Space', 'Hip hop', 'Techno'].map((music) => (
                <button
                  key={music}
                  className={`min-w-[6rem] py-2 rounded-lg transition-opacity duration-300 ${
                    selectedMusic === music ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                  onClick={() => handleMusicChange(music as Music)}
                >
                  {music}
                </button>
              ))}
            </div>
            <p className="text-center mt-2 font-light tracking-wide text-lg">Gives you energy boost and the strength to fight.</p>
          </div>

          <div className='pt-5 px-10 space-y-4'>
            <div className='w-fit flex items-center gap-x-4 mx-auto'>
              <div className='border-[#9333ea] p-1 rounded-full w-fit border-2'>
                <MusicIcon/>
              </div>
            <h2 className="text-xl mb-2">3. Select Purpose</h2>
            </div>
            <div className="flex justify-between">
              {['Focus', 'Be happy', 'Sleep Better'].map((purpose) => (
                <button
                  key={purpose}
                  className={`min-w-[6rem] py-2 rounded-lg transition-opacity duration-300 ${
                    selectedPurpose === purpose ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                  onClick={() => handlePurposeChange(purpose as Purpose)}
                >
                  {purpose}
                </button>
              ))}
            </div>
            <p className="text-center mt-2 font-light tracking-wide text-lg">Gives you energy boost and the strength to fight.</p>
          </div>
        </div>

        <div className='px-10 space-y-3'>
          <button
          className="cursor-pointer block w-full bg-white text-2xl text-[#0A0A0B] py-3.5 disabled:cursor-not-allowed rounded-full font-bold hover:bg-opacity-85 transition duration-300"
          onClick={handleCreate}
        >
          Create
        </button>
        {progress > 0 && progress < 100 && (
          <div className="w-full bg-white overflow-hidden rounded-full h-[60px] dark:bg-white">
            <div
              className="bg-[#0091ff] h-full flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
        </div>

        
      </div>

      <audio ref={audioRef} />
      <audio ref={guideAudioRef} />
    </div>
  );
};

export default BreathworkSession;