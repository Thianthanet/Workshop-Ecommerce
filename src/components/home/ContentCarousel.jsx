import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';

const ContentCarousel = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        handleGetImage()
    }, [])

    const handleGetImage = async () => {
        await axios.get('https://picsum.photos/v2/list?page=1&limit=10')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='shadow-lg'>
            <Swiper
                pagination={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper h-80 object-cover rounded-md mb-3">
                {
                    data?.map((item, index) =>
                        <SwiperSlide>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper object-cover rounded-md">
                {
                    data?.map((item, index) =>
                        <SwiperSlide>
                            <img src={item.download_url} className='rounded-md' />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default ContentCarousel