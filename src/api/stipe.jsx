import axios from "axios";

export const payment = async (token) =>
    await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/user/create-payment-intent',
        {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
