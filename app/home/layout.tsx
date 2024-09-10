import React, { ReactNode } from 'react'
import Logo from '../components/Logo'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center relative overflow-hidden">
      <div className="z-10 w-full max-w-xl text-center">
          
      {children}
      </div>
    </div>
  )
}

export default layout