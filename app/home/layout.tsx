'use client'
import React, { ReactNode, useEffect } from 'react'
import Logo from '../components/Logo'
import { usePathname, useRouter } from 'next/navigation';

const layout = ({children}: {children: ReactNode}) => {
  const router = useRouter();
  const path = usePathname()

  useEffect(() => {
    // Redirect only if the current route is /home
    if (path === '/home') {
      router.replace('/home/create');
    }
  }, [router]);
  return (
    <div className="min-h-screen text-white pt-4 pb-[5rem] flex flex-col items-center relative overflow-hidden">
      <div className="z-10 w-full max-w-xl px-4 text-center">
          
      {children}
      </div>
    </div>
  )
}

export default layout