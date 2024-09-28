import React, { ReactNode } from 'react'
import Logo from '../components/Logo'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen text-white pt-8 pb-[5rem] flex flex-col items-center relative overflow-hidden">
      <div className="z-10 w-full max-w-xl px-4 text-center">
        {/* contents */}
          <Logo/>
      {children}
      </div>
    </div>
  )
}

export default layout