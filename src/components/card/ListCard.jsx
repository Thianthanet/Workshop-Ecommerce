import React from 'react'
import { ListCheck } from 'lucide-react';
import useEcomStore from '../../store/ecom-store'
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';


const ListCard = () => {
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success('ใส่ตะกร้าเรียบร้อย', { position: "top-center" })
                navigate('/checkout')
            })
            .catch((err) => {
                console.log('err', err)
                toast.warning(err.response.data.message)
            })
    }

    console.log('user--', user)
    return (
        <div className='bg-gray-100 rounded-md p-4'>
            {/* Header */}
            <div className='flex gap-4'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold mb-2'>รายการสินค้า {cart.length} รายการ</p>
            </div>
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                    {
                        cart.map((item, index) =>
                            <div key={index} className='bg-white p-2 rounded-md shadow-md mb-2'>
                                {/* Row 1 */}
                                <div className='flex justify-between mb-2'>
                                    {/* Left */}
                                    <div className='flex gap-2 items-center'>

                                        {
                                            item.images && item.images.length > 0
                                                ? <img src={item.images[0].url} className='w-16 h-16 bg-gray-200 rounded-md shadow-md' />
                                                : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                                                    No Image
                                                </div>
                                        }
                                        <div>
                                            <p className='font-bold'>{item.title}</p>
                                            <p className='text-sm'>{item.price} x {item.count}</p>
                                        </div>
                                    </div>
                                    {/* Right */}
                                    <div className='font-bold text-blue-500'>
                                        {numberFormat(item.price * item.count)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* Right */}
                <div className='bg-white p-2 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl'>{numberFormat(getTotalPrice())}</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {
                            user
                                ? <button
                                    disabled={cart.length < 1}
                                    className='bg-red-500 w-full rounded-md text-white py-2 hover:bg-red-700' onClick={handleSaveCart}>
                                    <Link>สั่งซื้อ</Link>
                                </button>
                                : <button className='bg-blue-500 w-full rounded-md text-white py-2 hover:bg-blue-700'>
                                    <Link to={'/login'}>Login</Link>
                                </button>
                        }
                        <button className='border border-black bg-white w-full rounded-md text-black py-2 hover:bg-gray-300'><Link to={'/shop'}>แก้ไขรายการ</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCard