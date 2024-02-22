import React, { useState } from 'react'
import { PiPencilLineBold } from "react-icons/pi";
import { RxRulerSquare } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdForest } from "react-icons/md";

const StepSection = () => {
  return (
    <div className="min-h-4xl py-4 px-2 md:px-16" id="contact">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-md italic font-normal text-center mb-4">
        Stay green effortlessly! Our website makes reporting carbon emissions a breeze, so you can help the planet without the hassle.
        </p>
      </div>
      <div className="grid grid-rows-8 grid-cols-1 md:grid-rows-5 md:grid-cols-2 grid-flow-col gap-2 md:gap-8 max-w-screen p-0 md:p-10">
        <div className="row-span-2 md:col-span-1 h-full border border-gray-300 shadow-lg h-64 font-light text-black rounded-lg py-10 px-8 whitespace-pre-wrap">
            <PiPencilLineBold className = "mb-4" size = {35}/>
        <div className='flex justify-start items-center mb-4'>
        <div className="text-white font-bold text-sm rounded-full bg-black border-white border-4 w-12 h-12 flex items-center justify-center">
                  01
                </div>
                <span className = "text-2xl pl-6 font-extrabold">Input</span>
        </div>
        Through our user-friendly interfaces and intuitive tools, inputting carbon emission data has never been simpler
        </div>
        <div className="row-span-2 md:col-start-2 md:row-start-2 border border-gray-300 shadow-lg font-light text-black rounded-lg px-8 py-10 min-w-3xl">
        <RxRulerSquare className = "mb-4" size = {35}/>
        <div className='flex justify-start items-center mb-4'>
        <div className="text-white font-bold text-sm rounded-full bg-black border-white border-4 w-12 h-12 flex items-center justify-center">
                  02
                </div>
                <span className = "text-2xl pl-6 font-extrabold">Metrics</span>
        </div>
        Comprehensive carbon reporting metrics, enabling companies to track their carbon emission and environmental impact accurately.
        </div>
        <div className="row-span-2 md:row-span-2 border border-gray-300 shadow-lg font-light text-black rounded-lg px-8 py-10 ">
        <FaMagnifyingGlass className = "mb-4" size = {35}/>
        <div className='flex justify-start items-center mb-4'>
        <div className="text-white font-bold text-sm rounded-full bg-black border-white border-4 w-12 h-12 flex items-center justify-center">
                  03
                </div>
                <span className = "text-2xl pl-6 font-extrabold">Predict</span>
        </div>
        Analyzing current trends and patterns using AI models, providing valuable insights for proactive environmental management.
        </div>
        <div className="row-span-2 md:col-start-2 md:row-start-4 border border-gray-300 shadow-lg font-light text-black rounded-lg px-8 py-10 min-w-3xl">
        <MdForest className = "mb-4" size = {35}/>
        <div className='flex justify-start items-center mb-4'>
        <div className="text-white font-bold text-sm rounded-full bg-black border-white border-4 w-12 h-12 flex items-center justify-center">
                  04
                </div>
                <span className = "text-2xl pl-6 font-extrabold">Offset</span>
        </div>
        Allows companies to decarbonise and balance their carbon footprint by investing in environmentally friendly projects 
        </div>
      </div>
    </div>
  )
}

export default StepSection
