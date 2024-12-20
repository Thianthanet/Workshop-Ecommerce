import React, { useState, useEffect } from 'react'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'


const TableOrder = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrder(token)
    }, [])

    const handleGetOrder = (token) => {
        getOrderAdmin(token)
            .then((res) => {
                console.log(res)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Successed')
                handleGetOrder(token)
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
        <div className='container mx-auto p-4 bg-white shadow-md rounded-md'>
            <div>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='p-2 text-center border'>ลำดับ</th>
                            <th className='p-2 text-center border'>ผู้ใช้งาน</th>
                            <th className='p-2 text-center border'>สินค้า</th>
                            <th className='p-2 text-center border'>รวม</th>
                            <th className='p-2 text-center border'>วันที่</th>
                            <th className='p-2 text-center border'>สถานะ</th>
                            <th className='p-2 text-center border'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((item, index) => {
                                return (
                                    <tr key={index} className='border hover:bg-gray-100'>
                                        <td className='text-center p-2 border'>{index + 1}</td>
                                        <td className='p-2 border'>
                                            <p className='font-medium'>{item.orderedBy.email}</p>
                                            <p className='text-sm text-gray-500'>{item.orderedBy.address}</p>
                                        </td>
                                        <td className='px-2 border'>
                                            {
                                                item.products.map((product, index) =>
                                                    <li key={index} className='text-sm'>
                                                        {product.product.title} {" "}
                                                        <span className='text-gray-500'>{product.product.sold} x {numberFormat(product.product.price)}</span>
                                                    </li>
                                                )
                                            }
                                        </td>
                                        <td className='p-2 text-center border'>{numberFormat(item.cartTotal)}</td>
                                        <td className='p-2 text-center border'>
                                            {dateFormat(item.createdAt)}
                                        </td>
                                        <td className='p-2 text-center border'>
                                            <span className={`${getStutusColor(item.orderStatus)} rounded-full px-2 py-1`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>

                                        <td className='p-2 text-center border'>
                                            <select value={item.orderStatus} onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}>
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrder