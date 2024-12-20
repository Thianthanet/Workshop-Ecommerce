import axios from "axios";

export const createProduct = async (token, form) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/product',form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (count = 100) => {
    //code body
    return await axios.get('https://workshop-ecommerce-api-i7bm.vercel.app/api/products/' + count)
}

export const uploadFiles = async (token, form) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/removeimages', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const readProduct = async (token, id) => {
    //code body
    return await axios.get('https://workshop-ecommerce-api-i7bm.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    //code body
    return await axios.put('https://workshop-ecommerce-api-i7bm.vercel.app/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) => {
    //code body
    return await axios.delete('https://workshop-ecommerce-api-i7bm.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/search/filters', arg)
}

export const listProductBy = async (sort, order, limit) => {
    //code body
    return await axios.post('https://workshop-ecommerce-api-i7bm.vercel.app/api/productby', 
        {
            sort,
            order,
            limit,
        }
    )
}