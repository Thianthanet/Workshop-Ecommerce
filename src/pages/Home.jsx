import React from 'react'
import ContentCarousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'


const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <p className='text-2xl font-bold text-center mt-3 my-3'>สินค้าขายดี</p>
      <BestSeller />
      
      <p className='text-2xl font-bold text-center mt-3 my-3'>สินค้าใหม่</p>
      <NewProduct />
    </div>
  )
}

export default Home