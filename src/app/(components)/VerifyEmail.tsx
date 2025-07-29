//app/(components)/VerifyEmail.tsx
"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

type VerifyEmailType = {
  first: number,
  second: number,
  third: number,
  fourth: number
}

const VerifyEmail = () => {
  const form = useForm<VerifyEmailType>()
  const { register, handleSubmit, formState } = form
  const { errors, isSubmitting } = formState

  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const onSubmit = async (data: VerifyEmailType) => {
    const OTP = `${data.first}${data.second}${data.third}${data.fourth}`

    try {
      const res = await fetch("https://akil-backend.onrender.com/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, OTP }),
      })

      const result = await res.json()
      console.log(result)

      if (!res.ok || result.success === false) {
        alert(result.message || "Verification failed")
        return
      }

      router.push("/")
    } catch (err) {
      console.error("Error verifying OTP:", err)
      alert("An unexpected error occurred.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md font-epilogue">
      <h1 className="text-[24px] font-bold text-center mb-4 text-[#202430]">Verify Email</h1>

      <p className="text-[14px] text-[#7C8493] text-center mb-6">
        We've sent a verification code to <b>{email || "your email"}</b>. Please enter the code below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center gap-3">
          <input
            type="text"
            maxLength={1}
            {...register("first", { required: "First digit required" })}
            className="w-12 h-12 text-center border border-[#D6DDEB] rounded-[7px] text-[16px] font-semibold text-[#515B6F]"
          />
          <input
            type="text"
            maxLength={1}
            {...register("second", { required: "Second digit required" })}
            className="w-12 h-12 text-center border border-[#D6DDEB] rounded-[7px] text-[16px] font-semibold text-[#515B6F]"
          />
          <input
            type="text"
            maxLength={1}
            {...register("third", { required: "Third digit required" })}
            className="w-12 h-12 text-center border border-[#D6DDEB] rounded-[7px] text-[16px] font-semibold text-[#515B6F]"
          />
          <input
            type="text"
            maxLength={1}
            {...register("fourth", { required: "Fourth digit required" })}
            className="w-12 h-12 text-center border border-[#D6DDEB] rounded-[7px] text-[16px] font-semibold text-[#515B6F]"
          />
        </div>

        <div className="text-red-500 text-sm text-center space-y-1">
          {errors.first && <p>{errors.first.message}</p>}
          {errors.second && <p>{errors.second.message}</p>}
          {errors.third && <p>{errors.third.message}</p>}
          {errors.fourth && <p>{errors.fourth.message}</p>}
        </div>

        <p className="text-center text-[14px] text-[#7C8493]">
          You can request to Resend code in <span className="font-semibold">0:30</span>
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4640DE] text-white py-[12px] px-[24px] rounded-[80px] text-[16px] font-semibold mt-2 hover:bg-[#372fc6] disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  )
}

export default VerifyEmail
