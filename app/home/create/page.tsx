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
import {Swiper, SwiperSlide} from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
    label: 'space',
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
  const [selectedMusic, setSelectedMusic] = useState<any>({label: 'Hip hop', url: ''});
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
    const newString = replacePlaceholder(parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'en'], loadFromLocalStorage('selections')?.name);
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

  const addMusicCollection = async (voice, music, purpose, voiceData) => {
    const response = await fetch('/api/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voice, music, purpose, voiceData }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Music collection added:', data);
    } else {
      console.error('Error adding music collection:', data);
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
    
    audioRef.current.pause()
    guideAudioRef.current.pause()
    
    const musicUrl = tracks.find(item => item.label === music.toLowerCase()).url
    setSelectedMusic({label: music, url: musicUrl});
    if (musicRef.current.src === musicUrl && !musicRef.current.paused){
      musicRef.current.pause()
      return
    }
    if(musicRef.current){
      musicRef.current.src = musicUrl
      
    }
    if((musicRef.current.src === musicUrl && musicRef.current.paused)){
      musicRef.current.play()
      }else{
        musicRef.current.pause()
      }
  };

  const handlePurposeChange = (purpose: Purpose) => {
    audioRef.current.pause()
    guideAudioRef.current.pause()
    musicRef.current.pause()
    setSelectedPurpose(purpose);
  };

  const handleCreate = () => {
    // Simulate progress
    if(session){
      let currentProgress = 0;
      saveToLocalStorage('collection', {"music": selectedMusic})
      addMusicCollection(selectedVoice, selectedMusic.url, selectedMusic.url, guideAudioRef.current.src)
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        router.push("/home/player")
      }
    }, 500);
    }else{
      router.push('/login')
    }
  };


  const voices = ['Christopher','Ryan', 'Jenny', 'Amelia'];

  const handleVoiceChange = (voice: any, index: any) => {
    guideAudioRef?.current?.pause()
    musicRef.current.pause()
    setSelectedVoice(voice);
    setPosition(index + 1);
    const parsedMessages = JSON.parse(JSON.stringify(messages));
    const newString = replacePlaceholder(parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'en'], loadFromLocalStorage('selections')?.name);

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
    musicRef.current.pause()
    // save selected voice to local storage
    saveToLocalStorage('audio', {"voice-guide": guideAudioRef.current.src, "name": selectedVoice})
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session){
        router.push('/register')
      }
    }, 3000)
  }, [])

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


    <div className='h-[16rem] -mx-10 flex items-center'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        coverflowEffect={{
          rotate: 60,
          stretch: 20,
          depth: 10,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
         {voices.map((voice, index) => (
            <SwiperSlide zoom key={index} virtualIndex={index} className='overflow-hidden' onClick={() => handleVoiceChange(voice, index)}>
          <img src={`/images/${voice.toLowerCase()}.png`} className='h-[14rem] rounded-2xl bg-[#0d1c2a92]' />
        </SwiperSlide>
         )
        )}
        
       
      </Swiper>
    </div>
    <div className='mt-8 mb-4 bg-purple-600 capitalize cursor-pointer flex justify-center items-center min-w-[10rem] mx-auto py-2 rounded-full text-black w-fit font-semibold tracking-wider px-7 text-2xl' onClick={handleVoiceSelection}>{selectedVoice}</div>
            <p className="text-center mt-2 font-light tracking-wide text-lg">{selectedVoice} is our most popular guide</p>
          </div>

          <div className='pt-5 px-4 space-y-4'>
            <div className='w-fit flex items-center gap-x-4 mx-auto'>
              <div className='border-[#9333ea] rounded-full w-fit border-2'>
                <SoundIcon/>
              </div>
              <h2 className="text-xl mb-2">2. Select Music</h2>
            </div>
            
            <div className='h-16'>
                  <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        coverflowEffect={{
          rotate: 60,
          stretch: 20,
          depth: 10,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
         {['Space', 'Hip hop', 'Techno'].map((music, index) => (
            <SwiperSlide zoom key={index} virtualIndex={index} onClick={() => handleMusicChange(music as Music)}>
         <button
                  key={music}
                  className={`min-w-[6rem] py-2 rounded-lg transition-opacity duration-300 ${
                    selectedMusic.label === music ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                >
                  {music}
                </button>
        </SwiperSlide>
         )
        )}
        
       
      </Swiper>
      </div>
            <p className="text-center mt-2 font-light tracking-wide text-lg">Gives you energy boost and the strength to fight.</p>
          </div>

          <div className='pt-5 px-3 space-y-4'>
            <div className='w-fit flex items-center gap-x-4 mx-auto'>
              <div className='border-[#9333ea] p-1 rounded-full w-fit border-2'>
                <MusicIcon/>
              </div>
            <h2 className="text-xl mb-2">3. Select Purpose</h2>
            </div>

<div className='h-16'>
                  <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        coverflowEffect={{
          rotate: 60,
          stretch: 20,
          depth: 10,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
         {['Focus', 'Be happy', 'Sleep Better'].map((purpose, index) => (
            <SwiperSlide zoom key={index} virtualIndex={index} onClick={() => handlePurposeChange(purpose as Purpose)}>
         <button
                  key={purpose}
                  className={`min-w-[6rem] py-2 rounded-lg transition-opacity duration-300 ${
                    selectedPurpose === purpose ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
                  }`}
                  
                >
                  {purpose}
                </button>
        </SwiperSlide>
         )
        )}
        
       
      </Swiper>
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
      <audio ref={musicRef} />
      <audio ref={guideAudioRef} />
    </div>
  );
};

export default BreathworkSession;