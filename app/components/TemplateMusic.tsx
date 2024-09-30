import React from 'react'

const TemplateMusic = ({handleClick, selectPlay, user, voice, genries}: {handleClick: any, selectPlay: any, voice: string, user?: string, genries?: string[]}) => {
  return (
    <div className='py-3.5 border-b-2 border-[#AE9BCE]'>
        <div className='w-full flex items-center justify-between'>
            <div className='title flex gap-x-3'>
                <div className='title-icon cursor-pointer w-7  h-7 flex items-center justify-center bg-[#AE9BCE] rounded-lg' onClick={selectPlay}>
                <svg className="svg-icon" style={{ width: "1rem", height: "1rem", verticalAlign: "middle", fill: "#ffffff", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
    d="M667.733333 492.8l-281.6-281.6c-10.666667-10.666667-21.333333-14.933333-27.733333-10.666667s-12.8 12.8-12.8 27.733334v569.6c0 14.933333 4.266667 25.6 12.8 27.733333s17.066667 0 27.733333-10.666667l281.6-281.6c4.266667-4.266667 8.533333-12.8 8.533333-19.2 0-10.666667-2.133333-17.066667-8.533333-21.333333z"
  /></svg> 
           
                </div>
                <div className='title-text'>
                    <p className='uppercase text-xs font-light leading-tighter'>Name: <span className='capitalize'>Speech of {user && user + " And "} {voice}</span></p>
                    <p className='text-[10px] font-light text-[#AE9BCE]'>{genries?.join(", ")}</p>
                </div>
            </div>
            <div className='trash cursor-pointer' onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" style={{ width: "1.5rem", height: "1.5rem", verticalAlign: "middle", fill: "#ffffff", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1"><path d="M266.2 256l47.2 581.4c0 32.4 26.2 58.6 58.6 58.6h282c32.4 0 58.6-26.2 58.6-58.6L759.2 256H266.2z m123.2 530L376 320h37l13.8 466h-37.4z m140.6 0h-36V320h36v466z m104.6 0h-37.2l13.6-466H648l-13.4 466zM728 184h-72l-52.6-46c-7.4-6.4-16.8-10-26.4-10h-129.6c-9.8 0-19.4 3.6-26.8 10L368 184h-72c-35.2 0-60 16.8-60 52h552c0-35.2-24.8-52-60-52z"/></svg>
            </div>
        </div>
        </div>
  )
}

export default TemplateMusic