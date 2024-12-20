import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log('user form zustand', user)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)
    //Send to Back
    try {
      const res = await actionLogin(form)
      console.log('res', res)
      const role = res.data.payload.role
      console.log('role', role)
      roleRedirect(role)
      toast.success('Login Success')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-2'>
      <div className='w-full shadow-lg bg-white p-8 max-w-md rounded-3xl'>
        <h1 className='font-bold text-2xl text-center my-4'>Login</h1>
        <form className='mx-auto px-4' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <input type="email"
              name='email'
              className='border w-full px-3 py-2 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent'
              placeholder='Email'
              onChange={handleOnchange}
            />
            <input type="password"
              name='password'
              className='border w-full px-3 py-2 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent'
              placeholder='Password'
              onChange={handleOnchange}
            />
            <button className='bg-blue-500 w-full text-white rounded-md mt-5 px-2 py-1 hover:bg-blue-600 hover:translate-y-1 hover:duration-200'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login