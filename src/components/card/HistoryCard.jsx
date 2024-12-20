import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'

const HistoryCard = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrder(token)
    }, [])

    const handleGetOrder = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStutusColor = (status) => {
        switch (status) {
            case "Not Process":
                return 'bg-gray-200';
            case "Processing":
                return 'bg-blue-200';
            case "Completed":
                return 'bg-green-200';
            case "Cancelled":
                return 'bg-red-200';
        }
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-1'>ประวัติการสั่งซื้อ</h1>
            {/* cover*/}
            <div className='space-y-4'>
                {/* Card Loop Order */}
                {
                    orders?.map((item, index) => {
                        console.log('item', item)
                        return (
                            <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                                {/* Header */}
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Order date</p>
                                        <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    <div>
                                        <span className={`${getStutusColor(item.orderStatus)} rounded-full px-2 py-1`}>
                                        {item.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                {/* Table */}
                                <div>
                                    <table className='border w-full'>
                                        <thead>
                                            <tr className='bg-gray-200 rounded-md'>
                                                <th className='p-2 text-center border'>สินค้า</th>
                                                <th className='p-2 text-center border'>ราคา</th>
                                                <th className='p-2 text-center border'>จำนวน</th>
                                                <th className='p-2 text-center border'>รวม</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    console.log('product', product)
                                                    return (
                                                        <tr key={index} className='border'>
                                                            <td className='p-2 text-center'>{product.product.title}</td>
                                                            <td className='p-2 text-center'>{numberFormat(product.product.price)}</td>
                                                            <td className='p-2 text-center'>{product.count}</td>
                                                            <td className='p-2 text-center'>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                {/* Total */}
                                <div >
                                    <div className='text-right mt-2 text-green-500 font-bold'>
                                        <p>ราคาสุทธิ</p>
                                        <p>{numberFormat(item.cartTotal)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default HistoryCard