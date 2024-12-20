import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import axios from 'axios'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { FilePenLine } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'


const inititalState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}
const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })

    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])
    console.log(categories)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(inititalState)
            getProduct()
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
            toast.error(`Error`)
        }
    }

    const handleDelete = async (id) => {

        if (window.confirm('จบลบจริงๆ หรอ')) {
            console.log(id)
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.success("Deleted Product Successed!")
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-6 text-center">เพิ่มข้อมูลสินค้า</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.title}
                        onChange={handleOnChange}
                        placeholder="ชื่อสินค้า"
                        name="title"
                    />
                    <input
                        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.description}
                        onChange={handleOnChange}
                        placeholder="รายละเอียด"
                        name="description"
                    />
                    <input
                        type="number"
                        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.price}
                        onChange={handleOnChange}
                        placeholder="ราคา"
                        name="price"
                    />
                    <input
                        type="number"
                        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.quantity}
                        onChange={handleOnChange}
                        placeholder="จำนวนสินค้า"
                        name="quantity"
                    />
                    <select
                        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="categoryId"
                        onChange={handleOnChange}
                        value={form.categoryId}
                    >
                        <option value="" disabled>กรุณาเลือกหมวดหมู่</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <Uploadfile form={form} setForm={setForm} />
                </div>
                <button
                    className="mt-4 bg-green-500 text-white p-3 w-full rounded-md hover:bg-green-600 transition duration-200"
                >
                    เพิ่มสินค้า
                </button>
            </form>
            <hr className="my-6" />
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-sm rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-3 text-center">No.</th>
                        <th className="border p-3 text-center">รูปภาพ</th>
                        <th className="border p-3 text-center">ชื่อสินค้า</th>
                        <th className="border p-3 text-center">รายละเอียด</th>
                        <th className="border p-3 text-center">ราคา</th>
                        <th className="border p-3 text-center">จำนวน</th>
                        <th className="border p-3 text-center">ขายได้</th>
                        <th className="border p-3 text-center">วันที่อัพเดท</th>
                        <th className="border p-3 text-center">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-3 text-center">{index + 1}</td>
                            <td className="border p-3 text-center">
                                {item.images.length > 0 ? (
                                    <img
                                        src={item.images[0].url}
                                        className="w-24 h-24 rounded-md shadow-sm object-cover"
                                        alt={item.title}
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
                                        No Image
                                    </div>
                                )}
                            </td>
                            <td className="border p-3 text-center">{item.title}</td>
                            <td className="border p-3 text-center">{item.description}</td>
                            <td className="border p-3 text-center">{numberFormat(item.price)}</td>
                            <td className="border p-3 text-center">{item.quantity}</td>
                            <td className="border p-3 text-center">{item.sold}</td>
                            <td className="border p-3 text-center">{dateFormat(item.updatedAt)}</td>
                            <td className="border p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <Link
                                        to={`/admin/product/${item.id}`}
                                        className="text-blue-500 hover:scale-105 transition"
                                    >
                                        <FilePenLine />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:scale-105 transition"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default FormProduct