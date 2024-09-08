'use client';

import React, { useEffect, useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';


const Snackbar = () => {
    const [visible, setVisible] = useState(false);
    const { pending, data } = useFormStatus();
    const [animationClass, setAnimationClass] = useState<string>('');
    
    console.log(data)

    useEffect(() => {
      
    //   if (pending) {
    // setAnimationClass('slide-in');
    //   setVisible(true);
    //   const timer = setTimeout(() => {
    //       setVisible(false);
    //       setAnimationClass('slide-out');
    //   }, 3000); // Snackbar visible for 3 seconds

    //   return () => clearTimeout(timer);
    // }
  }, [pending]);

  return (
    
      <div
      className={`fixed top-2 right-2 z-20 py-2 px-4 rounded shadow-lg transition-transform duration-500 ease-in-out
      ${animationClass} ${!visible ? 'opacity-0' : 'opacity-100'}
      bg-red-600 text-white`}
    >
        {'Soomething went wrong'}
      </div>
    )

};

export default Snackbar;
