import axios from "axios";

export const createUserCart = async (token, cart) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    //code body
    return await axios.get('https://workshop-ecommerce-api-i7bm.vercel.app/api/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = async (token, address) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/user/address',
        { address },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const saveOrder = async (token, payload) => {
    // code body
    return axios.post("https://workshop-ecommerce-api-i7bm.vercel.app/api/user/order", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getOrders = async (token) => {
    // code body
    return axios.get("https://workshop-ecommerce-api-i7bm.vercel.app/api/user/order", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};