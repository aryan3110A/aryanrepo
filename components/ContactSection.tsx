"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Footer from "./Footer"
import { db } from "@/lib/firebaseConfig"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz0dKO8m-4_vrGpnaPI4zP01OkoN5uXxo1DrJ9jY_oz5tsoNUYvtxxNKgvdYMiZUGsWBw/exec" // Replace with your actual script URL

interface FormData {
  fullName: string
  email: string
  phone: string
  option: string
  message: string
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    option: "",
    message: "",
  })

  const [rating, setRating] = useState<number>(0)
  const handleRatingClick = (star: number) => {
    if (rating === star) {
      setRating(0) // If the same star is clicked, reset to 0 (unselect)
    } else {
      setRating(star) // Otherwise, update to the clicked star
    }
  } // State inside the component

  const [newsletterEmail, setNewsletterEmail] = useState("") // Newsletter state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hasSelectedOption, setHasSelectedOption] = useState(false)
  const [isFirstClick, setIsFirstClick] = useState(true)

  const dropdownRef = useRef<HTMLSelectElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  // Handle Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)
    setFormErrors({})

    const errors: { email?: string; phone?: string } = {}
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Enter a valid email address."
    }
    if (formData.phone.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits."
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      await addDoc(collection(db, "contactForm"), {
        ...formData,
        timestamp: serverTimestamp(), // Add timestamp here
      })

      setSuccessMessage("Your form has been submitted successfully! Our team will reach out to you soon.")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        option: "",
        message: "",
      })
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Newsletter Subscription
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)
  const [newsletterError, setNewsletterError] = useState<string | null>(null)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNewsletterError(null)
    setNewsletterMessage(null)

    if (!newsletterEmail.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNewsletterError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    try {
      // Store in Firebase
      await addDoc(collection(db, "newsletterSubscriptions"), {
        email: newsletterEmail,
        timestamp: serverTimestamp(),
      })

      // Store in Google Sheets
      const formData = new FormData()
      formData.append("NewsLetterEmail", newsletterEmail)

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit to Google Sheets")
      }

      setNewsletterMessage("You have successfully subscribed to our newsletter!")
      setNewsletterEmail("")
    } catch (err) {
      setNewsletterError("Failed to subscribe. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const form = document.forms["submit-to-google-sheet"] as HTMLFormElement | null

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => console.log("Success!", response))
          .catch((error) => console.error("Error!", error.message))
      })
    }
  }, [])

  const [formErrors, setFormErrors] = useState<{
    email?: string
    phone?: string
  }>({})

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-black p-6 pt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start ml-36 mt-10">
          {/* Left Section (Fixed Position) */}
          <div className="text-white mt-28 self-start">
            <h2 className="text-2xl mb-2">Need immediate assistance?</h2>
            <p className="text-white mb-16">Let's make things happen—your goals, our expertise!</p>

            <h1 className="text-5xl font-bold leading-tight mb-8">
              COME ON,
              <br />
              GIVE US A SHOUT!
            </h1>
          </div>

          {/* Right Section - Contact Form */}
          <div
            className={`backdrop-blur-3xl bg-gradient-to-br from-[#262B30] via-[#3B4C5E] to-[#262B30] rounded-[3rem] p-14 shadow-[0_0_300px_80px_rgba(35,46,50,0.8)] mt-10  w-[36rem] ${
              isDropdownOpen ? "h-[100%]" : "h-[95%]"
            }`}
          >
            <h3 className="text-white text-2xl font-bold mb-1">Contact Form</h3>
            <p className="text-gray-300 text-sm mb-4">
              Fill out the form below, and our team will get back to you promptly. Let's connect and create solutions
              together!
            </p>

            <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-2" name="submit-to-google-sheet">
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-md mb-4">
                  {successMessage}
                </div>
              )}
              {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md">{error}</div>}

              <div className="mb-2">
                <label className="text-white text-sm">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Name"
                  className="w-full h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[15px] opacity-90 transition-all duration-300"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="mb-2">
                <label className="text-white text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="Email"
                  className="w-full h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[15px] opacity-90 transition-all duration-300"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div className="mb">
                <label className="text-white text-sm">Phone</label>
                <div className="flex gap-2">
                  <select className="w-20 mt-2 bg-[#111111] text-white rounded-lg px-2 text-sm">
                    <option className="text-sm">+91</option>
                  </select>
                  <input
                    type="tel"
                    name="Phone"
                    className="flex-1 h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-sm placeholder-text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[15px] opacity-90 transition-all duration-300"
                    placeholder="Enter your contact number"
                    value={formData.phone}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\D/g, "") // Remove non-numeric characters
                      if (newValue.length <= 10) {
                        setFormData({ ...formData, phone: newValue })
                      }
                    }}
                    required
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div className="mt-2">
                <select
                  ref={dropdownRef}
                  className={`w-[50%] h-10 bg-[#111111] text-white border border-gray-300 rounded-lg p-2 pl-4 text-sm mt-2 transition-all duration-200 ${
                    isDropdownOpen ? "mb-36" : "mb-2"
                  }`}
                  value={formData.option}
                  name="Contact_Purpose"
                  onChange={(e) => {
                    setFormData({ ...formData, option: e.target.value })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                    setIsFirstClick(true)
                  }}
                  onClick={(e) => {
                    e.stopPropagation() // Prevent the click from immediately closing the dropdown
                    if (!isDropdownOpen && !hasSelectedOption) {
                      setIsDropdownOpen(true)
                      setIsFirstClick(false)
                    } else {
                      setIsDropdownOpen(false)
                      setHasSelectedOption(false)
                    }
                  }}
                >
                  <option value="">Pick an option</option>
                  <option value="option1">General Inquiry</option>
                  <option value="option2">Support Request</option>
                  <option value="option3">Feature Suggestion</option>
                  <option value="option4">Business Collaboration</option>
                </select>
              </div>

              <div
                className={`mb-4 transition-all duration-300 ${
                  hasSelectedOption ? "mt-0" : isDropdownOpen ? "mt-36" : "mt-0"
                }`}
              >
                <label className="text-white text-sm transition-all">How can we help you?</label>
                <textarea
                  className="w-full h-24 bg-[#111111] text-white rounded-lg p-2 pl-4 text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[15px] opacity-90 transition-all duration-300"
                  placeholder="Enter your message here"
                  value={formData.message}
                  name="Message"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="ml-[22rem] w-28 h-12 bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] 
        text-white rounded-full py-2 px-6 transition-all 
        hover:opacity-100 hover:shadow-[0_0_10px_5px_rgba(101,107,245,0.8)]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Rating Section */}
        <div
          className="relative mt-40 text-center text-white "
          style={{
            backgroundImage: "url('/bg_rating7.png')",
            backgroundSize: "contain", // Ensures the image maintains its original size
            backgroundRepeat: "no-repeat", // Prevents repeating of the image
            backgroundPosition: "center", // Centers the image
            width: "100%", // Full width
            height: "800px", // Replace with the actual height of your image
            opacity: "",
          }}
        >
          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Glowing Effect for Icon */}
            <div className="inline-block rounded-full mb-0 p-4">
              <Image
                src="/rateicon.png"
                alt="Mobile App"
                width={128}
                height={128}
                className="w-32 h-32 object-contain rounded-full "
              />
            </div>

            {/* Rating Heading */}
            {/* Rating Heading */}
            <h3 className="text-2xl mb-4">
              How do you rate
              <br />
              Your app experience?
            </h3>

            {/* Star Rating */}
            <div className="-mt-6 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`text-[4rem] transition-all duration-200 ${
                    star <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Background Overlay to Improve Visibility */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
        </div>

        {/* Newsletter Section */}
        {/* Newsletter Section */}
        <div className="w-full bg-black py-12 mt-20 md:mt-40 mb-4">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left side - Heading */}
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-semibold leading-tight">
                Join our newsletter to
                <br />
                keep up to date with us!
              </h2>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col md:flex-row gap-3 w-full max-w-2xl"
                name="submit-to-google-sheet"
              >
                <div className="flex-grow relative w-[22rem]">
                  <input
                    type="email"
                    name="NewsLetterEmail"
                    placeholder="Enter your email"
                    className="w-full bg-transparent border border-[#414141] rounded-full py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[15px] opacity-90 transition-all duration-300"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                </div>
                <button
                  type="submit" 
                  className="px-6 py-3 w-[8rem] rounded-full font-medium text-white transition-colors 
               bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] 
               hover:bg-white hover:text-black hover:from-white hover:to-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="flex justify-end  mr-[13.2rem]">
            {newsletterMessage && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-full text-center mt-2">
                {newsletterMessage}
              </div>
            )}
            {newsletterError && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md text-center mt-2">
                {newsletterError}
              </div>
            )}
          </div>
        </div>

        <div className=" border-t border-[#FFFFFF52] mx-[5rem] "></div>
      </div>
      <Footer />
    </>
  )
}

export default ContactSection

