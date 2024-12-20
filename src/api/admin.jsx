import axios from "axios";

export const getOrderAdmin = async (token) => {
    //code body
    return await axios.get('https://workshop-ecommerce-api-i7bm.vercel.app/api/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    //code body
    return await axios.put('https://workshop-ecommerce-api-i7bm.vercel.app/api/admin/order-status',
        {
            orderId, orderStatus,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const getListAllUser = async (token) => {
    //code body
    return await axios.get('https://workshop-ecommerce-api-i7bm.vercel.app/api/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/change-status', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserRole = async (token, value) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/change-role', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}