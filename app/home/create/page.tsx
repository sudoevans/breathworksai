'use client'
import React, { useState, useEffect, useRef } from 'react';
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
import {Swiper, SwiperSlide, } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/react'

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


const Page: React.FC = () => {
  const router = useRouter();
  
  const [selectedVoice, setSelectedVoice] = useState<Voice>('Ryan');
  const [selectedMusic, setSelectedMusic] = useState<any>({label: 'Hip hop', url: ''});
  const [selectedPurpose, setSelectedPurpose] = useState<{label: Purpose, url: string}>({label: 'Be happy',  url: ''});
  const [progress, setProgress] = useState<number>(0);
  const [position, setPosition] = useState(2);
  const [loading, setLoading] = useState(false);

  const {data: session} = useSession()
  const [guideAudios, setGuideAudios] = useState<Record<string, string>>({});

  const audioRef = useRef<any | null>(null);
  const musicRef = useRef<any | null>(null);
  const guideAudioRef = useRef<any | null>(null);

  const addMusicCollection = async (voice: string, music: string, musicGenre: string, purpose: string, purposeGenre: string, voiceData: string) => {
    const response = await fetch('/api/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voice, music, musicGenre, purposeGenre, purpose, voiceData }),
    });
  
    const data = await response.json();
    if (response.ok) {
      return response.ok
    } else {
      throw new Error(`Error adding music collection: ${data.message}`)
    }
  };


  const handleMusicChange = (music: Music) => {
    
    audioRef?.current?.pause()
    guideAudioRef?.current?.pause()
    
    const musicUrl = tracks.find(item => item.label === music.toLowerCase()).url
    setSelectedMusic({label: music, url: musicUrl});
    if (musicRef.current.src === musicUrl && !musicRef.current.paused){
      musicRef.current?.pause()
      return
    }
    if(musicRef.current){
      musicRef.current.src = musicUrl
      
    }
    if((musicRef.current.src === musicUrl && musicRef.current.paused)){
      musicRef.current.play()
      }else{
        musicRef.current?.pause()
      }
  };

  const handlePurposeChange = (purpose: Purpose) => {
    audioRef.current?.pause()
    guideAudioRef.current?.pause()
    musicRef.current?.pause()
    setSelectedPurpose({label: purpose, url: ''});
  };

  const handleCreate = async () => {
    // Simulate progress
    setLoading(true)
    if (progress > 0){
      return;
    }
    if(session){
      let currentProgress = 0;

      try{
        const success = await addMusicCollection(selectedVoice, selectedMusic.url, selectedMusic.label, selectedPurpose.url, selectedPurpose.label, guideAudioRef.current.src);

       if (success){
        const interval = setInterval(() => {
          currentProgress += 10;
          setProgress(currentProgress);
          if (currentProgress >= 100) {
            clearInterval(interval);
            router.push("/home/player")
            setLoading(false)
          }
        }, 500);
       }
      }catch (err){
        console.log(err)
      }
    }else{
      router.push('/login')
    }
  };


  const voices = ['Christopher','Ryan', 'Jenny', 'Amelia'];

  const handleVoiceChange = (voiceSelected?: any, index?: any) => {
    let voice
    if (!voiceSelected){
      voice = voices[index]
    } else{
      voice = voiceSelected
    }
    guideAudioRef?.current?.pause();

    musicRef.current?.pause();

    setSelectedVoice(voice);

    setPosition(index + 1);

    const parsedMessages = JSON.parse(JSON.stringify(messages));

    const nameFromLocalStorage = loadFromLocalStorage('selections')?.name || session?.user?.name;

    const messagePerLanguage = parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'en'];

    const newString = replacePlaceholder(messagePerLanguage, nameFromLocalStorage);

    // If audio for selected voice isn't preloaded yet, fetch it after 300 milliseconds
    // if preloaded already, delay fora second to allow for scroll behaviour and play 1 second after swipe of seclection of voice
    if (!guideAudios[voice]) {
      setTimeout(() => {
      getElevenLabsResponse(newString);
    }, 300);
    } else {
      setTimeout(() => {
        playPreloadedAudio(guideAudios[voice]);
      }, 1000)
    }
    
  };

  // method to play selected audio voice
  const playPreloadedAudio = (audioSrc: string) => {
    if (guideAudioRef.current && audioRef.current) {
      guideAudioRef.current.pause();
      // audioRef.current.pause();
      guideAudioRef.current.src = audioSrc;
      audioRef.current.play();
      guideAudioRef.current.playbackRate = 0.7
      guideAudioRef.current.play();
    }
  };


  // important to query selected voice if all voices have not been loaded yet
  const getElevenLabsResponse = async (text: string) => {

    const alterEgoId = JSON.parse(JSON.stringify(messages))[selectedVoice]?.ego;

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        voice: `${alterEgoId}`
      })
    });

    const file = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (guideAudioRef.current) {
        guideAudioRef.current.src = reader.result as string;
        guideAudioRef.current.playbackRate = 0.7
        // guideAudioRef.current.play();
      }
    }
  };

  const handleVoiceSelection = (voice) => {
    guideAudioRef.current?.pause()
    audioRef.current?.pause()
    musicRef.current?.pause()
  }

    // Preload individual guide audio
  const preloadAudio = async (voice: string) => {
    try {
      // get each model voice alterego
      const alterEgoId = JSON.parse(JSON.stringify(messages))[voice]?.ego;

      // get each model's supposed message
      const parsedMessages = JSON.parse(JSON.stringify(messages));

      // replace placeholder text with individual's name or just skip if their preference is not to

      const nameFromLocalStorage = loadFromLocalStorage('selections')?.name;
      const messagePerLanguage = parsedMessages[voice][loadFromLocalStorage('selections')?.language?.toLowerCase() || 'en']

      const newString = replacePlaceholder(messagePerLanguage, nameFromLocalStorage);
      // fetch  each voice
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newString, voice: `${alterEgoId}` }),
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
      if (error?.name === 'AbortError') {
        console.log(`Preload for ${voice} was aborted.`);
      } else {
        console.error(`Failed to preload audio for ${voice}:`, error);
      }
    }
  };


  // Preload all guide audios when the page mounts
  useEffect(() => {
    const preloadGuideAudios = async () => {
      const loadingQueue = Object.keys(JSON.parse(JSON.stringify(messages)))
      for (let voice of loadingQueue) {
        await preloadAudio(voice);
      }
    };
    preloadGuideAudios();
    if (audioRef.current) {
      audioRef.current.src = `/audio/jenny_sample.mp3`;
    }
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session){
        router.push('/register')
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, session])

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
      {
        voices.length  > 0 && (
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
        onRealIndexChange={(index) => handleVoiceChange(null, index.activeIndex)}
      >
         { voices.map((voice, index) => (
            <SwiperSlide zoom key={index} virtualIndex={index} className='overflow-hidden' onClick={() => handleVoiceChange(voice, index)}>
              
                  <Image alt={`swiper-img-${index}`} priority src={`/images/${voice.toLowerCase()}.png`} className='h-[14rem] rounded-2xl bg-[#0d1c2a92]' width={220} height={350} />
          
        </SwiperSlide>
         )
        )}
        
       
      </Swiper>
        )
      }
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
                    selectedPurpose.label === purpose ? 'bg-purple-600 opacity-100' : 'bg-purple-800 opacity-50'
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
          disabled={loading}
        >
          Create
        </button>
          <div className={`w-full bg-white ${progress <= 0 && 'opacity-50' } overflow-hidden rounded-full h-[60px] dark:bg-white`}>
            <div
              className="bg-[#0091ff] h-full flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
          </div>

        
      </div>

      <audio ref={audioRef} />
      <audio ref={musicRef} />
      <audio ref={guideAudioRef} />
    </div>
  );
};

export default Page;