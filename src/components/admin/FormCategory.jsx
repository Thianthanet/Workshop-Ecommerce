import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const FormCategory = () => {
    //Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    // const getCategory = async (token) => {
    //     try {
    //         const res = await listCategory(token)
    //         setCategories(res.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} successed!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
            toast.error('Error!!')
        }
    }

    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeCategory(token, id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} successed`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='container mx-auto p-4 bg-white rounded-lg shadow-md'>
            <h1 className='font-bold text-xl'>Category Manage</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='border mx-5'
                    onChange={(e) => setName(e.target.value)}
                />
                <button className='bg-blue-500 text-white rounded-full px-2 py-1 hover:scale-105 hover:bg-blue-700 hover:duration-200 shadow-lg'>Add Category</button>
            </form>
            <hr className='mb-2' />
            <ul className='list-none'>
                {
                    categories.map((item, index) =>
                        <li key={index} className='flex justify-between mb-2'>
                            <span className='font-bold'>
                                {item.name}
                            </span>
                            <button className='bg-red-600 text-white rounded-full px-2 py-1 hover:scale-105 hover:bg-red-700 hover:duration-200 shadow-lg' onClick={() => handleRemove(item.id)}>Delete</button>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default FormCategory