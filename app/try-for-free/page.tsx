import React from 'react';
import Logo from '../components/Logo';
export default function TryForFree() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/space-background.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="z-10 w-full max-w-md px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Logo /> {/* Use the Logo component */}
        </div>

        <h2 className="text-3xl font-bold mb-8">Try for free</h2>

        <form
          action="/api/register"
          method="POST"
          className="bg-white rounded-lg p-4 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700">
              <span className="text-sm font-semibold">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <span className="text-sm font-semibold">Language</span>
              <select
                name="language"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                required
              >
                <option value="English">English</option>
                <option value="Swedish">Swedish</option>
              </select>
            </label>
          </div>
        </form>

        {/*  Checkbox*/}
        <div className="mb-4">
            <label className="flex items-center text-white-700">
              <input
                type="checkbox"
                name="sayName"
                className="mr-2"
              />
              <span className="text-sm">
                Say my name in the journey. Note! name pronunciation is still in beta. You can go back and uncheck this box.
              </span>
            </label>
          </div>
        
        {/* Lets Go Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-purple-900 transition duration-300"
        >
          Lets Go
        </button>
      </div>
    </div>
  );
}
