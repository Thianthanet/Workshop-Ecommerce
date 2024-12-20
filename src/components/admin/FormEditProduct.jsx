import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import axios from 'axios'
import {
    readProduct,
    updateProduct
} from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'


const inititalState = {
    title: "mouse",
    description: "desc",
    price: 2000,
    quantity: 30,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const [form, setForm] = useState(inititalState)

    useEffect(() => {
        getCategory()
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token, id, form) => {
        try {
            const res = await readProduct(token, id, form)
            console.log('res from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log('Error fetch date', err)
        }
    }
    console.log('form', form)

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
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        } catch (err) {
            console.log("Error",err)
            toast.error(`Error`)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
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
                    แก้ไขสินค้า
                </button>
            </form>
        </div>
    )
}

export default FormEditProduct