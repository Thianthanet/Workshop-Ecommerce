import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import zxcvbn from 'zxcvbn';
import { zodResolver } from '@hookform/resolvers/zod'


const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email!' }),
  password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password is not match!",
  path: ["confirmPassword"]
})

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : "").score
  }

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 1) {
    //   toast.warning('Weak password!!')
    // }

    // console.log('Ok')

    try {
      const res = await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/register', data)
      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-2'>
      <div className='w-full shadow-lg bg-white p-8 max-w-md rounded-3xl'>
        <h1 className='font-bold text-2xl text-center my-4'>Register</h1>
        <form className='mx-auto px-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div>
              <input
                {...register("email")}
                className={`border w-full px-3 py-2 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent
            ${errors.email && 'border-red-500'}`}
                placeholder='Email'
              />
              {
                errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>
              }
            </div>

            <div>
              <input
                {...register("password")}
                className={`border w-full px-3 py-2 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                ${errors.email && 'border-red-500'}`}
                placeholder='Password'
              />
              {
                errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>
              }

              {
                watch().password?.length > 0 && <div className='flex'>
                  {
                    Array.from(Array(5).keys()).map((item, index) =>
                      <span className='w-1/5 px-1 mt-2' key={index}>
                        <div className={`rounded-md h-2 ${passwordScore <= 2
                          ? 'bg-red-500'
                          : passwordScore < 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>

                        </div>
                      </span>
                    )
                  }
                </div>
              }
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                className={`border w-full px-3 py-2 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
              ${errors.email && 'border-red-500'}`}
                placeholder='Confirm Password'
              />
              {
                errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
              }
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <button className='bg-blue-500 w-full text-white rounded-md mt-5 px-2 py-1 hover:bg-blue-600 hover:translate-y-1 hover:duration-200'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register