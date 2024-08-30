import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <Image 
        src="/images/logo.png"  // Update with the actual path to your logo
        alt="MYBREATHWORK.AI Logo"
        width={250} 
        height={250} // Set the height according to your design
        className="mx-auto"
      />

    </div>
  );
}
