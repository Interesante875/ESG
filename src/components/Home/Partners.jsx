import React, { useState } from 'react'
import { TiVendorApple, TiVendorMicrosoft } from "react-icons/ti";
import { FaApple } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";

const Partners = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission, such as sending data to an API
    alert('Message sent!')
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className="min-h-4xl bg-gradient-to-b from-white to-gray-50 py-4 px-2 md:px-16" id="contact">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Trusted by Our Partners
        </h2>
        <p className="text-md italic font-normal text-center mb-4">
          “Business is not about one’s own success or failure, but how
          successful we make our partners.” – Donald Trump
        </p>
      </div>
      <div className="grid grid-rows-7 md:grid-rows-4 grid-flow-col gap-2 md:gap-8 max-w-screen p-0 md:p-10">
        <div className="row-span-3 md:row-span-4 md:col-span-1 h-full border border-gray-300 shadow-lg h-96 font-light text-black rounded-lg py-10 px-8 whitespace-pre-wrap">
          <span className = "flex gap-6 font-medium text-lg mb-4"><TiVendorMicrosoft size = {30}/>Microsoft</span>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.
        "
        </div>
        <div className="row-span-2 lg:row-span-2 border border-gray-300 shadow-lg font-light text-black rounded-lg px-8 py-4 min-w-3xl">
        <span className = "flex gap-6 font-medium text-lg mb-4"><FaApple size = {30}/>Apple</span>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.
        "
        </div>
        <div className="row-span-2 md:row-span-2 border border-gray-300 shadow-lg font-light text-black rounded-lg px-8 py-4 ">
        <span className = "flex gap-6 font-medium text-lg mb-4"><SiSamsung size = {30}/>Samsung</span>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.
        "
        </div>
      </div>
    </div>
  )
}

export default Partners
