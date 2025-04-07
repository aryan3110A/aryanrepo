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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="relative flex bg-black rounded-xl shadow-2xl overflow-hidden"
        style={{
          width: "90%",
          maxWidth: "1200px",
          height: "auto",
          maxHeight: "85vh",
          minHeight: "500px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 rounded-full bg-[#222] hover:bg-[#333] transition-colors"
          style={{ width: "32px", height: "32px", margin: "12px" }}
        >
          <X style={{ width: "18px", height: "18px", margin: "auto" }} className="text-white" />
        </button>

        {/* Left side - Image */}
        <div className="hidden md:block relative" style={{ width: "35%" }}>
          <div className="absolute inset-0" style={{ height: "60%" }}>
            <Image src="/popup/popup.png" alt="Space explorer" fill className="object-cover" priority />
          </div>

          {/* Diamond logo and text at bottom */}
          <div
            className="absolute bottom-0 left-0 flex flex-col items-center text-center"
            style={{ width: "100%", paddingBottom: "6%" }}
          >
            <div
              className="rounded-full bg-[#0e1a2d] flex items-center justify-center border-2 border-[#5AD7FF]"
              style={{ width: "60px", height: "60px", marginBottom: "15px" }}
            >
              <Image
                src="/diamond.png"
                alt="Diamond"
                width={40}
                height={40}
                className="text-blue-400"
                style={{ width: "32px", height: "32px" }}
              />
            </div>
            <div className="text-white">
              <p className="font-bold" style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}>
                Become a true
              </p>
              <p
                className="font-bold bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent hover:underline"
                style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
              >
                {selectedPlan === "apprentice" ? "Apprentice" : selectedPlan === "artisan" ? "Artisan" : "Maestro"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ padding: "clamp(16px, 3%, 24px)" }}>
          <div style={{ marginBottom: "clamp(16px, 3vh, 24px)" }}>
            <h2 className="font-bold text-white" style={{ fontSize: "clamp(20px, 2vw, 28px)", marginBottom: "8px" }}>
              You're almost out of tokens!
            </h2>
            <p className="text-gray-400" style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}>
              Upgrade for more features and benefits
            </p>
          </div>

          {/* Payment toggle */}
          <div
            className="bg-[#10151F] rounded-full flex mx-auto"
            style={{ padding: "4px", marginBottom: "clamp(16px, 3vh, 24px)", width: "100%", maxWidth: "400px" }}
          >
            <button
              onClick={() => setPaymentPeriod("yearly")}
              className={`flex-1 rounded-full text-center transition-colors ${
                paymentPeriod === "yearly" ? "bg-[#0e1a2d] text-white" : "text-gray-400 hover:text-white"
              }`}
              style={{
                padding: "clamp(6px, 1vh, 10px) clamp(8px, 2vw, 16px)",
                fontSize: "clamp(12px, 0.9vw, 16px)",
              }}
            >
              Pay Yearly <span className="text-[#ff7b00] ml-1">20% OFF 🔥</span>
            </button>
            <button
              onClick={() => setPaymentPeriod("monthly")}
              className={`flex-1 rounded-full text-center transition-colors ${
                paymentPeriod === "monthly" ? "bg-[#0e1a2d] text-white" : "text-gray-400 hover:text-white"
              }`}
              style={{
                padding: "clamp(6px, 1vh, 10px) clamp(8px, 2vw, 16px)",
                fontSize: "clamp(12px, 0.9vw, 16px)",
              }}
            >
              Pay Monthly
            </button>
          </div>

          {/* Plan selection */}
          <div style={{ marginBottom: "clamp(16px, 3vh, 24px)" }}>
            {Object.entries(plans).map(([key, plan], index) => (
              <button
                key={key}
                onClick={() => setSelectedPlan(key as any)}
                className={`w-full flex items-center justify-between rounded-3xl border ${
                  selectedPlan === key ? "border-[#619CFA] bg-black" : "border-[#282C42] bg-black hover:border-[#555]"
                } transition-colors`}
                style={{
                  padding: "clamp(8px, 1.5vh, 14px) clamp(12px, 2vw, 18px)",
                  marginBottom: index < Object.entries(plans).length - 1 ? "8px" : "0",
                }}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded-full border-2 mr-2 flex items-center justify-center ${
                      selectedPlan === key ? "border-[#3b82f6]" : "border-[#555]"
                    }`}
                    style={{ width: "clamp(16px, 1.2vw, 20px)", height: "clamp(16px, 1.2vw, 20px)" }}
                  >
                    {selectedPlan === key && (
                      <div
                        className="rounded-full bg-[#3b82f6]"
                        style={{ width: "clamp(8px, 0.6vw, 12px)", height: "clamp(8px, 0.6vw, 12px)" }}
                      ></div>
                    )}
                  </div>
                  <span className="text-white" style={{ fontSize: "clamp(14px, 1vw, 18px)" }}>
                    {plan.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through mr-2" style={{ fontSize: "clamp(12px, 0.9vw, 16px)" }}>
                    ${paymentPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white" style={{ fontSize: "clamp(14px, 1vw, 18px)" }}>
                    ${paymentPeriod === "yearly" ? plan.yearlyDiscountedPrice : plan.monthlyDiscountedPrice}
                    <span className="text-gray-400"> / {paymentPeriod === "yearly" ? "year" : "month"}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Benefits */}
          <div
            className="bg-gradient-to-r from-[#070A0F] to-[#0D121C] rounded-xl"
            style={{
              padding: "clamp(12px, 2vw, 20px)",
              marginBottom: "clamp(16px, 3vh, 24px)",
            }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start"
                style={{
                  marginBottom: index < benefits.length - 1 ? "clamp(8px, 1.5vh, 12px)" : "0",
                }}
              >
                <div className="text-[#3b82f6] flex-shrink-0" style={{ marginTop: "2px", marginRight: "8px" }}>
                  <Check style={{ width: "clamp(14px, 1vw, 20px)", height: "clamp(14px, 1vw, 20px)" }} />
                </div>
                <span className="text-white" style={{ fontSize: "clamp(13px, 0.9vw, 16px)" }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* View all features link */}
          <div style={{ marginBottom: "clamp(16px, 3vh, 24px)" }}>
            <a
              href="#"
              className="bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent hover:underline flex items-center justify-end"
              style={{ fontSize: "clamp(12px, 0.9vw, 16px)" }}
            >
              View all of the available features and benefits
              <ExternalLink
                style={{ width: "clamp(14px, 0.8vw, 16px)", height: "clamp(14px, 0.8vw, 16px)", marginLeft: "4px" }}
              />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto" style={{ marginTop: "auto" }}>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-black border border-[#282C42] text-white hover:bg-[#222] transition-colors"
              style={{
                padding: "clamp(8px, 1.2vh, 12px) clamp(12px, 2vw, 20px)",
                fontSize: "clamp(13px, 0.9vw, 16px)",
              }}
            >
              Maybe later
            </button>
            <button
              className="flex-1 rounded-xl bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-white transition-colors"
              style={{
                padding: "clamp(8px, 1.2vh, 12px) clamp(12px, 2vw, 20px)",
                fontSize: "clamp(13px, 0.9vw, 16px)",
              }}
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

