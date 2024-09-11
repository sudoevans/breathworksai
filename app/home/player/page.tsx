'use client'
import TemplateMusic from '@/app/components/TemplateMusic';
import React, { useEffect, useRef, useState } from 'react'
import { loadFromLocalStorage } from 'utils/localStorage';

const tracks = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  ];

  type Voice = 'Ryan' | 'Jenny' | 'Amelia' | 'Christopher';
const PlayerPage = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [masterVolume, setMasterVolume] = useState<number>(1);
    const [volumes, setVolumes] = useState<number[]>([1, 1, 1, 1]);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [originalVolumes, setOriginalVolumes] = useState<number[]>(volumes);
    const [selectedVoice, setSelectedVoice] = useState<Voice  | undefined>();
    const [musicTracks, setMusicTracks] = useState(Array.from({ length: 3 }).fill(null))

    const [username, setUsername] = useState('')
    const guideAudioRef = useRef<any | null>(null);
    
  
    const audioRefs = useRef<Array<React.RefObject<any>>>(
        tracks.map(() => React.createRef<any>())
      );
    
      useEffect(() => {
        // Load username from local storage
        setUsername(loadFromLocalStorage('selections')?.name || '');
    
        // Load the selected voice guide
        const info = loadFromLocalStorage('audio');
        setSelectedVoice(info.name);

        const trackSource = loadFromLocalStorage(`collection`)['music'];
        if (audioRefs.current){
          audioRefs.current[0].current.src = trackSource.url
        }
    
      }, []);

      const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
        audioRefs.current.forEach(ref => {
          if (ref.current) {
            if (isPlaying) {
              ref.current.pause();
            } else {
              ref.current.play();
            }
          }
        });
      };
    
      const handleRewind = () => {
        audioRefs.current.forEach(ref => {
          if (ref.current) {
            ref.current.currentTime = Math.max(ref.current.currentTime - 10, 0);
          }
        });
      };
    
      const handleForward = () => {
        audioRefs.current.forEach(ref => {
          if (ref.current) {
            ref.current.currentTime = Math.min(ref.current.currentTime + 10, ref.current.currentTime);
          }
        });
      };
    
      const handleMasterVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        setMasterVolume(volume);
        audioRefs.current.forEach((ref, index) => {
          if (ref.current) {
            ref.current.volume = isMuted ? 0 : volume * volumes[index];
          }
        });
      };
    
      const handleVolumeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        setVolumes(volumes.map((vol, i) => (i === index ? volume : vol)));
        if (audioRefs.current[index].current) {
          audioRefs.current[index].current.volume = isMuted ? 0 : masterVolume * volume;
        }
      };
      const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (isMuted) {
          // Restore original volumes when unmuting
          audioRefs.current.forEach((ref, index) => {
            if (ref.current) {
              ref.current.volume = masterVolume * originalVolumes[index];
            }
          });
        } else {
          // Store original volumes and mute
          setOriginalVolumes(volumes);
          audioRefs.current.forEach(ref => {
            if (ref.current) {
              ref.current.volume = 0;
            }
          });
        }
      };

      const playGuidance = () => {
        const audioElement = guideAudioRef.current;
        if (audioElement) {
          // Check if audio is playing
          if (!audioElement.paused) {
            // Pause if audio is playing
            audioElement.pause();
          } else {
            // Set source and play if audio is not playing
            audioElement.src = loadFromLocalStorage('audio')["voice-guide"];
            audioElement.playbackRate = 0.7;
            audioElement.play();
          }
        }
      };

      
  return (
    <div>
    
    <div className="z-10 w-full bg-player-bg h-screen md:h-auto md:min-h-[48.625rem] pt-[10rem] flex flex-col justify-center gap-y-6 items-center max-w-md p-6 space-y-8">
    <p>{selectedVoice && `Speech of ${username !== "" ? (username  + " "): ""} ${selectedVoice}`}</p>
      <div className="flex items-center gap-x-10 mb-4">
        <button onClick={handleRewind}>
        <svg className="svg-icon" style={{width: "2rem", height: "2rem", verticalAlign: "middle", fill: "#AE9BCE", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M356.266667 492.8l281.6-281.6c10.666667-10.666667 21.333333-14.933333 27.733333-10.666667s12.8 12.8 12.8 27.733334v569.6c0 14.933333-4.266667 25.6-12.8 27.733333s-17.066667 0-27.733333-10.666667l-281.6-281.6c-4.266667-4.266667-8.533333-12.8-8.533334-19.2 0-10.666667 2.133333-17.066667 8.533334-21.333333z"  /></svg>
        </button>
        <button onClick={handlePlayPause} className="bg-[#AE9BCE] w-12 h-12 flex justify-center items-center rounded-full hover:opacity-90 mx-4">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" style={{ width: "1.4rem", height: "1.6rem", verticalAlign: "middle", fill: "#0B050B", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1"><path d="M735.059262 155.203828c-3.090385 0-115.797329 0-118.887714 0-19.643386 0-35.567054 15.923668-35.567054 35.567054 0 3.090385 0 639.366829 0 642.457214 0 19.643386 15.923668 35.567054 35.567054 35.567054 3.090385 0 115.797329 0 118.887714 0 19.643386 0 35.567054-15.923668 35.567054-35.567054 0-3.090385 0-639.366829 0-642.457214C770.626315 171.128519 754.702648 155.203828 735.059262 155.203828z"/><path d="M407.828452 155.203828c-3.090385 0-115.797329 0-118.887714 0-19.643386 0-35.567054 15.923668-35.567054 35.567054 0 3.090385 0 639.366829 0 642.457214 0 19.643386 15.923668 35.567054 35.567054 35.567054 3.090385 0 115.797329 0 118.887714 0 19.643386 0 35.567054-15.923668 35.567054-35.567054 0-3.090385 0-639.366829 0-642.457214C443.395506 171.128519 427.471838 155.203828 407.828452 155.203828z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon ml-1" style={{ width: "1.4rem", height: "1.6rem", verticalAlign: "middle", fill: "#0B050B", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1"><path d="M160 976C160 993.6 172.8 1008 190.4 1008L833.6 560C859.2 542.4 864 523.2 864 510.4L864 510.4C864 510.4 862.4 483.2 833.6 462.4L190.4 16C174.4 16 160 30.4 160 48L160 976 160 976Z"/></svg>
          )}
        </button>
        <button onClick={handleForward}>
        <svg className="svg-icon" style={{ width: "2rem", height: "2rem", verticalAlign: "middle", fill: "#AE9BCE", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
    d="M667.733333 492.8l-281.6-281.6c-10.666667-10.666667-21.333333-14.933333-27.733333-10.666667s-12.8 12.8-12.8 27.733334v569.6c0 14.933333 4.266667 25.6 12.8 27.733333s17.066667 0 27.733333-10.666667l281.6-281.6c4.266667-4.266667 8.533333-12.8 8.533333-19.2 0-10.666667-2.133333-17.066667-8.533333-21.333333z"
  />
        </svg>

        </button>
      </div>
      <div className='flex w-full items-center gap-x-7'>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={masterVolume}
        onChange={handleMasterVolumeChange}
        className="w-full self-center mt-4 cursor-pointer range-input mb-4"
      />
      <button onClick={toggleMute} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-700">
      {isMuted ? (
       <svg
       xmlns="http://www.w3.org/2000/svg"
       className="svg-icon"
       style={{ width: "1.6em", height: "1.6em", verticalAlign: "middle", fill: "#AE9BCE", overflow: "hidden" }}
       viewBox="0 0 1024 1024"
       version="1.1"
     >
       <path d="M349.460317 796.444444 L105.650794 796.444444C87.771429 796.444444 73.142857 781.815873 73.142857 763.936508L73.142857 260.063492C73.142857 242.184127 87.771429 227.555556 105.650794 227.555556L333.206349 227.555556" />
       <path d="M251.936508 292.571429C251.936508 292.571429 559.136508 16.253968 577.015873 16.253968L625.777778 16.253968C643.657143 16.253968 658.285714 30.88254 658.285714 48.761905L658.285714 975.238095C658.285714 993.11746 643.657143 1007.746032 625.777778 1007.746032L577.015873 1007.746032C559.136508 1007.746032 251.936508 731.428571 251.936508 731.428571" />
       <path d="M724.926984 407.974603 L950.857143 633.904762" />
       <path d="M950.857143 407.974603 L724.926984 633.904762" />
       <path d="M154.412698 342.95873 L154.412698 682.666667" />
       <path d="M235.68254 342.95873 L235.68254 682.666667" />
       <line x1="0" y1="0" x2="1024" y2="1024" stroke="currentColor" strokeWidth="50" strokeLinecap="round" />
     </svg>
     
      
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" style={{ width: "1.6rem", height: "1.6rem", verticalAlign: "middle", fill: "#AE9BCE", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1"><path d="M830.450526 853.759999q-11.722105 8.791579-27.351579 8.791579-19.536842 0-33.701053-14.164211t-14.164211-33.701053q0-21.490526 16.606316-36.143158 0.976842-0.976842 1.953684-1.465263t1.953684-1.465263l0.976842-0.976842q27.351579-18.56 50.795789-43.957895t41.027368-55.191579 27.351579-63.494737 9.768421-69.84421q0-73.263158-37.12-133.827368t-92.8-99.637895q-20.513684-14.652632-20.513684-39.073684 0-19.536842 14.164211-33.701053t33.701053-14.164211q16.606316 0 29.305263 10.745263 36.143158 25.397895 67.402105 59.098947t53.726316 73.263158 35.166316 84.496842 12.698947 92.8q0 48.842105-12.698947 93.776842t-35.654737 84.985263-54.214737 73.751579-68.378947 59.098947zM775.747368 415.157894q20.513684 28.328421 32.72421 57.145263t12.210526 69.84421q0 39.073684-12.698947 70.332632t-32.235789 56.656842q-7.814737 10.745263-16.606316 19.048421t-22.467368 8.303158q-17.583158 0-29.793684-12.698947t-12.210526-30.282105q0-7.814737 2.930526-15.629474l-0.976842 0q4.884211-10.745263 11.722105-20.513684t13.187368-20.025263 10.745263-23.444211 4.395789-31.747368q0-17.583158-4.395789-30.770526t-10.745263-23.932632-13.187368-20.513684-10.745263-20.513684q-2.930526-6.837895-2.930526-15.629474 0-17.583158 12.210526-30.282105t29.793684-12.698947q13.675789 0 22.467368 8.303158t16.606316 19.048421zM460.227368 995.402104q-49.818947-44.934737-105.498947-93.776842t-103.545263-89.869474q-55.68-46.888421-111.36-92.8-10.745263 0.976842-21.490526 0.976842-8.791579 0.976842-18.56 0.976842l-16.606316 0q-26.374737 0-42.981053-16.117895t-16.606316-38.585263l0-246.16421 0.976842 0-0.976842-0.976842q0-27.351579 17.094737-44.934737t42.492632-17.583158l55.68 0q89.869474-76.193684 163.132631-136.757895 31.258947-26.374737 61.541053-51.28421t54.703158-45.423158 41.027368-34.189474 20.513684-16.606316q29.305263-21.490526 47.376842-19.536842t28.328421 17.583158 14.164211 38.096842 3.907368 41.027368l0 788.311578 0 2.930526q0 18.56-6.837895 39.562105t-21.002105 33.212632-35.654737 10.256842-49.818947-28.328421z"/></svg>
      )}
    </button>
      </div>
      <div className="flex h-[3rem] gap-4 justify-between items-end mb-0 mt-auto w-full">
  {tracks.map((track, index) => (
    <div key={index} className="flex flex-col items-center flex-grow">
        <div className='rounded-full mb-12 border-2 border-[#AE9BCE]'>
        <svg height="36" viewBox="0 0 48 48" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M30 12H6v4h24v-4zm0 8H6v4h24v-4zM6 32h16v-4H6v4zm28-20v16.37c-.63-.23-1.29-.37-2-.37-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6V16h6v-4H34z" fill='#AE9BCE'/></svg>
        </div>
      <audio ref={audioRefs.current[index]} data-index={index} />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumes[index]}
        onChange={(e) => handleVolumeChange(index, e)}
        className="range-sub-input transform -rotate-90 w-24 h-6"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  ))}
</div>
<div className='mt-4 py-6 text-left w-full'>
        <div className='py-4 -mx-6 px-6 border-b-2 border-[#AE9BCE] flex gap-x-3 items-center'>
            <div className='cursor-pointer' onClick={playGuidance}>
            
                  <svg className="svg-icon" style={{ width: "2rem", height: "2rem", verticalAlign: "middle", fill: "#ffffff", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M667.733333 492.8l-281.6-281.6c-10.666667-10.666667-21.333333-14.933333-27.733333-10.666667s-12.8 12.8-12.8 27.733334v569.6c0 14.933333 4.266667 25.6 12.8 27.733333s17.066667 0 27.733333-10.666667l281.6-281.6c4.266667-4.266667 8.533333-12.8 8.533333-19.2 0-10.666667-2.133333-17.066667-8.533333-21.333333z"/>
              </svg>
              
            </div>
            <p className='uppercase'>Breathing Guidance</p>
        </div>
        {
          musicTracks.map((item, index) => (
            <div key={index}>
              <TemplateMusic handleClick={() => setMusicTracks(musicTracks.filter((_, idx) => idx !== index))}/>
            </div>
          ))
        }
        
      </div>
      
      <audio ref={guideAudioRef} />
      </div>
      
    </div>
  )
}

export default PlayerPage