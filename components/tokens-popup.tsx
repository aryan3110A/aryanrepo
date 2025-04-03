"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Check, ExternalLink } from "lucide-react"

interface TokensPopupProps {
  onClose: () => void
}

export default function TokensPopup({ onClose }: TokensPopupProps) {
  const [paymentPeriod, setPaymentPeriod] = useState<"yearly" | "monthly">("yearly")
  const [selectedPlan, setSelectedPlan] = useState<"apprentice" | "artisan" | "maestro">("apprentice")

  const plans = {
    apprentice: {
      name: "Apprentice",
      monthlyPrice: 12,
      monthlyDiscountedPrice: 10,
      yearlyPrice: 120,
      yearlyDiscountedPrice: 96,
    },
    artisan: {
      name: "Artisan",
      monthlyPrice: 30,
      monthlyDiscountedPrice: 24,
      yearlyPrice: 300,
      yearlyDiscountedPrice: 240,
    },
    maestro: {
      name: "Maestro",
      monthlyPrice: 60,
      monthlyDiscountedPrice: 48,
      yearlyPrice: 600,
      yearlyDiscountedPrice: 480,
    },
  }

  const benefits = [
    "Get 8,500 Fast Tokens for faster creation",
    "Store up to 25,500 unused tokens in your Rollover Token Bank",
    "Enable Private Generations",
    "Motion Videos with No Watermarks",
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative flex w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] h-auto overflow-hidden bg-black rounded-xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 rounded-full bg-[#222] hover:bg-[#333] transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Left side - Image */}
        <div className="hidden md:block w-[35%] relative">
          <div className="absolute inset-0 h-[65%]">
            <Image src="/popup/popup.png" alt="Space explorer" fill className="object-cover" priority />
          </div>

          {/* Diamond logo and text at bottom */}
          <div className="absolute bottom-0 left-0 w-full pb-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm-laptop:w-18 sm-laptop:h-18 md:w-20 md:h-20 rounded-full bg-[#0e1a2d] flex items-center justify-center mb-4 border-2 border-[#5AD7FF]">
              <Image
                src="/diamond.png"
                alt="Diamond"
                width={40}
                height={40}
                className="text-blue-400 w-8 h-8 sm-laptop:w-9 sm-laptop:h-9 md:w-10 md:h-10"
              />
            </div>
            <div className="text-white">
              <p className="text-xl sm-laptop:text-2xl font-bold">Become a true</p>
              <p className="text-2xl sm-laptop:text-3xl font-bold bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent hover:underline">
                {selectedPlan === "apprentice" ? "Apprentice" : selectedPlan === "artisan" ? "Artisan" : "Maestro"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col">
          <div className="mb-4 sm-laptop:mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
              You're almost out of tokens!
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">Upgrade for more features and benefits</p>
          </div>

          {/* Payment toggle */}
          <div className="bg-[#10151F] rounded-full p-1 flex mb-4 sm-laptop:mb-5 lg:mb-6 w-full max-w-md mx-auto">
            <button
              onClick={() => setPaymentPeriod("yearly")}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-full text-center transition-colors ${
                paymentPeriod === "yearly" ? "bg-[#0e1a2d] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Pay Yearly <span className="text-[#ff7b00] ml-1">20% OFF 🔥</span>
            </button>
            <button
              onClick={() => setPaymentPeriod("monthly")}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-full text-center transition-colors ${
                paymentPeriod === "monthly" ? "bg-[#0e1a2d] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Pay Monthly
            </button>
          </div>

          {/* Plan selection */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm-laptop:mb-5 lg:mb-6">
            {Object.entries(plans).map(([key, plan]) => (
              <button
                key={key}
                onClick={() => setSelectedPlan(key as any)}
                className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-3xl border ${
                  selectedPlan === key ? "border-[#619CFA] bg-black" : "border-[#282C42] bg-black hover:border-[#555]"
                } transition-colors`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mr-2 sm:mr-3 flex items-center justify-center ${
                      selectedPlan === key ? "border-[#3b82f6]" : "border-[#555]"
                    }`}
                  >
                    {selectedPlan === key && <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3b82f6]"></div>}
                  </div>
                  <span className="text-white text-base sm:text-lg">{plan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through mr-2 text-sm sm:text-base">
                    ${paymentPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white text-sm sm:text-base">
                    ${paymentPeriod === "yearly" ? plan.yearlyDiscountedPrice : plan.monthlyDiscountedPrice}
                    <span className="text-gray-400"> / {paymentPeriod === "yearly" ? "year" : "month"}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-[#070A0F] to-[#0D121C] rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm-laptop:mb-5 lg:mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start mb-3 sm:mb-4 last:mb-0">
                <div className="mt-0.5 mr-2 sm:mr-3 text-[#3b82f6]">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-white text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          {/* View all features link */}
          <div className="mb-4 sm-laptop:mb-5 lg:mb-6">
            <a
              href="#"
              className="bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent hover:underline flex items-center justify-end text-sm sm:text-base"
            >
              View all of the available features and benefits
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
            <button
              onClick={onClose}
              className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-black border border-[#282C42] text-white hover:bg-[#222] transition-colors text-sm sm:text-base"
            >
              Maybe later
            </button>
            <button className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-white transition-colors text-sm sm:text-base">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

