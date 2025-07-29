//app/(components)/SignUp.tsx
"use client"

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { SignUpType } from '../types/AuthTypes'


const SignUp = () => {

  const verRouter = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // If user just signed in with Google and session exists, redirect with email
    if (status === "authenticated" && session?.user?.email) {
      verRouter.push(`/VerifyEmail?email=${encodeURIComponent(session.user.email)}`);
    }
  }, [status, session, verRouter]);


  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user"
    }
  })

  const router = useRouter()

  const onSubmit = async (data: SignUpType) => {
    try {
        const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })

        const result = await res.json()
        console.log("Signup response:", result)

        if (!res.ok || result.success === false) {
        alert(result.message || "Signup failed")
        return
        }

        // Redirect to verify email page with email as query param
        router.push(`/VerifyEmail?email=${encodeURIComponent(data.email)}`)
    } catch (err) {
        console.error("Network or unexpected error:", err)
        alert("An unexpected error occurred.")
    }
    }


  return (
    <div>
      <h1 className="font-extrabold text-[32px] font-poppins flex items-center justify-center">Sign Up Today!</h1>

      <button
        type="button"
        onClick={() => signIn('google')}
        className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px] flex justify-center gap-[10px]"
      >
        <FcGoogle className="w-5 h-5" />
        <p className="font-epilogue font-bold text-[16px] text-center align-middle text-[#4640DE]">Continue with Google</p>
      </button>

      <div className="flex items-center mb-4 mt-[10px] text-gray-500">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-sm">Or Sign Up with Email</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col justify-center">
          <label htmlFor="name" className="font-semibold text-[16px] text-[#515B6F] font-epilogue">Full Name</label>
          <input
            className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px]"
            type="text"
            id="name"
            {...register("name", { required: "Full Name is required." })}
          />
          <p className="text-red-600">{errors?.name?.message}</p>
        </div>

        {/* Email */}
        <div className="flex flex-col justify-center">
          <label htmlFor="email" className="font-semibold text-[16px] text-[#515B6F] font-epilogue">Email Address</label>
          <input
            className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px]"
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              validate: (value) =>
                value.endsWith("@gmail.com") || value.endsWith("@a2sv.org") || value.endsWith("@astu.edu.et") || "This domain is not supported",
            })}
          />
          <p className="text-red-600">{errors?.email?.message}</p>
        </div>

        {/* Password */}
        <div className="flex flex-col justify-center">
          <label htmlFor="password" className="font-semibold text-[16px] text-[#515B6F] font-epilogue">Password</label>
          <input
            className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px]"
            type="password"
            id="password"
            {...register("password", { required: "Password is required." })}
          />
          <p className="text-red-600">{errors?.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col justify-center">
          <label htmlFor="confirmPassword" className="font-semibold text-[16px] text-[#515B6F] font-epilogue">Confirm Password</label>
          <input
            className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px]"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) => value === watch("password") || "Passwords do not match"
            })}
          />
          <p className="text-red-600">{errors?.confirmPassword?.message}</p>
        </div>

        {/* Hidden role field */}
        <input type="hidden" value="user" {...register("role")} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white font-bold py-[12px] px-[24px] rounded-[80px]"
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>        
      
      <div className="flex mt-4 gap-2">
        <p className="font-normal text-[16px] font-epilogue text-[#202430]">Already have an account?</p>
        <Link href="/SignIn" className="text-blue-600 hover:underline">Login</Link>
      </div>

      <p className="font-normal text-[14px] font-epilogue text-[#7C8493]">
        By clicking 'Continue', you acknowledge that you have read and accepted our Terms of Service and Privacy Policy.
      </p>

    </div>
    
  )
}

export default SignUp
