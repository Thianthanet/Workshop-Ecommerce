import React, { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'


const SummaryCard = () => {
    const token = useEcomStore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const naveigate = useNavigate()

    useEffect(() => {
        handleGetUserCart(token)
    }, [])

    const handleGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSaveAddress = () => {
        console.log(address)
        if (!address) {
            return toast.warning('Pleas fill address!')
        }
        saveAddress(token, address)
            .then((res) => {
                console.log(res)
                toast.success('บันทึกที่อยู่ในการจัดส่งเรียบร้อย')
                setAddressSaved(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleToPayment = () => {
        if (!addressSaved) {
            return toast.warning('กรุณากรอกที่อยู่')
        }
        naveigate('/user/payment')
    }

    console.log(products)

    return (
        <div className='mx-auto'>
            <div className='flex flex-nowrap gap-4'>
                {/* Left */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg font-bold'>ที่อยู่ในการจัดส่ง</h1>
                        <textarea
                            className='w-full px-2 rounded-md'
                            placeholder='ที่อยู่จัดส่ง'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                        <button
                            className='bg-blue-500 text-white
                         hover:bg-blue-700 py-2 px-4 rounded-md 
                         shadow-md hover:scale-105 hover:translate-y-1
                          hover:duration-200'
                            onClick={handleSaveAddress}
                        >
                            Save Address
                        </button>
                    </div>
                </div>
                {/* Rignt */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg font-bold'>คำสั่งซื้อของคุณ</h1>
                        {/* Item List */}
                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p className='font-bold'>{item.product.title}</p>
                                            <p className='text-sm'>Amount: {item.count} x {item.price}</p>
                                        </div>
                                        <div>
                                            <p className='text-red-500 font-bold'>฿ {numberFormat(item.product.price * item.count)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง:</p>
                                <p>0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด:</p>
                                <p>0.00</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ:</p>
                                <p className='text-red-500 font-bold text-lg'>{ numberFormat(cartTotal) }</p>
                            </div>
                            <div>
                                <button
                                    className='bg-red-500 text-white w-full 
                                    rounded-md shadow-md py-2 hover:bg-red-700 
                                    hover:translate-y-1 hover:duration-200'
                                    onClick={handleToPayment}
                                >ดำเนินการชำระเงิน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard