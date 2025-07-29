//app/(components)/SignIn.tsx
'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SignInType } from '../types/AuthTypes'


const SignIn = () => {
  const form = useForm<SignInType>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
  const router = useRouter()

  const onSubmit = async (data: SignInType) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
      alert("Invalid credentials");
    } else if (res?.ok) {
      router.push("/");
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px] w-[408px]">
        <div className='flex flex-col justify-center'>
            <label className="font-semibold text-[16px] text-[#515B6F] font-epilogue" htmlFor="email">Email Address</label>
            <input
            className="w-[408px] border border-[#D6DDEB] p-[12px] rounded-[7px]"
            type="email"
            id="email"
            {...register("email", {
                required: 'Please enter your email',
                pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format"
                },
                validate: {
                notValidEmail: (fieldValue) =>
                    (fieldValue.endsWith("@gmail.com") || fieldValue.endsWith("@a2sv.org")) || "This domain is not supported"
                }
            })}
            />
            <p className='text-red-600'>{errors?.email?.message}</p>
        </div>

        <div className='flex flex-col'>
            <label className="font-semibold text-[16px] text-[#515B6F] font-epilogue" htmlFor="password">Password</label>
            <input
            className="w-[408px] border border-[#D6DDEB] py-[12px] px-[16px] rounded-[7px]"
            type="password"
            id="password"
            {...register("password", { required: "Password is required." })}
            />
            <p className='text-red-600'>{errors?.password?.message}</p>
        </div>

        <button className="bg-[#4640DE] text-white font-bold py-[12px] px-[24px] rounded-[80px]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
        </button>
    </form>

  )
}

export default SignIn;
