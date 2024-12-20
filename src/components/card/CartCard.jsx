import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils/number'

const CartCard = () => {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    console.log(carts)
    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border p-2 '>
                {/* Card */}
                {
                    carts.map((item, index) =>


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
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='text-red-500 hover:scale-105 hover:duration-200 hover:translate-y-1'
                                    onClick={() => actionRemoveProduct(item.id)}
                                >
                                    <Trash2 />
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className='flex justify-between'>
                                {/* left */}
                                <div className='border rounded-sm px-2 py-1'>
                                    <button
                                        className='px-2 py-1 bg-gray-200 rounded-sm 
                                                shadow-sm hover:scale-105 hover:duration-200
                                                 hover:text-red-500'
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                    ><Minus size={16} /></button>

                                    <span className='px-4'>{item.count}</span>

                                    <button className='px-2 py-1 bg-gray-200 rounded-sm 
                                             shadow-sm hover:scale-105 hover:duration-200
                                              hover:text-blue-500'
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                    ><Plus size={16} /></button>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-blue-500'>
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{numberFormat(getTotalPrice())}</span>
                </div>
                {/* Button */}
                <button className='mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md shadow-md'><Link to={'/cart'}>ชำระเงิน</Link></button>
            </div>
        </div>
    )
}

export default CartCard