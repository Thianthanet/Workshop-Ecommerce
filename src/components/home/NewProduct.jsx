import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('updatedAt', 'desc', 15)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) =>
                    <SwiperSlide>
                        <ProductCard item={item} key={index} />
                    </SwiperSlide>
                )
            }
        </SwiperShowProduct>
        // <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 shadow-lg'>

        // </div>
    )
}

export default NewProduct