import React, { ReactNode } from 'react'
import Logo from '../components/Logo'

const HomeLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen text-white pt-8 pb-[5rem] flex flex-col items-center relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/starbackground_video.mov" type="video/mp4" />
      </video>
      <div className="z-10 w-full max-w-xl px-10 text-center">
          <Logo/>
      {children}
      </div>
    </div>
  )
}

export default HomeLayout