import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react';

const MainNav = () => {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }
    // console.log(Boolean(user))
    const logout = useEcomStore((state) => state.logout)

    return (
        <nav className='bg-black shadow-lg'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16 text-white'>
                    <div className='flex items-center gap-4 '>
                        <Link to={'/'} className='text-2xl font-bold'>Logo</Link>
                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium "
                                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
                            }
                        // 
                        >
                            Home
                        </NavLink>
                        <NavLink to={'/shop'}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
                            }
                        >
                            Shop
                        </NavLink>
                        {/* Badge */}
                        <NavLink to={'/cart'}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
                            }
                        >
                            Cart
                            {
                                carts.length > 0 && (<span className='absolute top-0 bg-red-500 rounded-full px-2'>{carts.length}</span>)
                            }

                        </NavLink>
                    </div>

                    {
                        user
                        ? <div className='flex items-center gap-4'>
                        <button
                            className='flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-lg'
                            onClick={toggleDropDown}
                        >
                            <img
                                className='w-10 h-10'
                                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png?f=webp&w=256" />
                            <ChevronDown />
                        </button>

                        {
                            isOpen &&
                            <div className='absolute mt-2 top-16 bg-gray-300 shadow-2xl text-black z-50'>
                                <Link to={'/user/history'}
                                    className='block px-4 py-2 hover:bg-gray-400'
                                >
                                    History
                                </Link>
                                <button
                                    to={'/user/history'}
                                    className='block px-4 py-2 hover:bg-gray-400'
                                    onClick={() => logout()}
                                >
                                    Logout
                                </button>
                            </div>
                        }

                    </div>
                        : <div className='flex items-center gap-4'>
                        <NavLink to={'/register'}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
                            }
                        >
                            Register
                        </NavLink>
                        <NavLink to={'/login'}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium"
                                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
                            }
                        >
                            Login
                        </NavLink>
                    </div>
                    }
                    
                    
                </div>
            </div>
        </nav>
    )
}

export default MainNav