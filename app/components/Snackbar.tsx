'use client';

import React, { useEffect, useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';


const Snackbar = () => {
    const [visible, setVisible] = useState(false);
    const { pending } = useFormStatus();
    const [animationClass, setAnimationClass] = useState<string>('');
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
      
      if (pending) {
        setSubmitted(true)
      }
    }, [pending]);
    
    useEffect(() => {
        let timer: any
        if (submitted && !pending) {
            timer = setTimeout(() => {
                setVisible(true);
                setAnimationClass('slide-in');
          }, 300);
        }

        return () => clearTimeout(timer);
    }, [submitted, pending])

    useEffect(() => {
        let timer: any
        
        if (visible) {
            timer = setTimeout(() => {
                setAnimationClass('slide-out');
                setVisible(false);     
            }, 3000);
            
        }
        return () => clearTimeout(timer);
    }, [visible])

  return (
    
      <div
      className={`fixed top-2 right-2 z-20 py-2 px-4 rounded shadow-lg transition-transform duration-500 ease-in-out
      ${animationClass} ${visible ? 'opacity-0' : 'opacity-100'}
      bg-red-600 text-white`}
    >
        {'Something went wrong'}
      </div>
    )

};

export default Snackbar;
