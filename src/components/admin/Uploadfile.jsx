import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resizer from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/Product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';


const Uploadfile = ({ form, setForm }) => {
    const [isLoading, setIsloading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnChange = (e) => {
        //code
        setIsloading(true)
        const files = e.target.files
        if (files) {
            setIsloading(true)
            let allFiles = form.images // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                //Validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`)
                    continue
                }
                //Image Resize
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        //endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsloading(false)
                                toast.success('Upload image successed')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsloading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
        .then((res) => {
            const filterImages = images.filter((item) => {
                console.log(item)  
                return item.public_id !== public_id             
            })
            toast.success(res.data)
            console.log('filterImages', filterImages)
            setForm({
                ...form,
                images: filterImages
            })
        })
        .catch((err) => {
            console.log(err)
            toast.error("Error!!")
        })
    }

    console.log(form)
    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    isLoading && <Loader className='animate-spin w-16 h-16'/>
                }
            
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative'>
                            <img src={item.url} className='w-24 h-24 hover:scale-105' />
                            <span 
                            className='absolute top-0 right-0 bg-red-500 p-1 rounded-md'
                            onClick={() => handleDelete(item.public_id)}
                            >x</span>
                        </div>
                    )
                }
            </div>

            <div>
                <input
                    type="file"
                    name='images'
                    multiple
                    onChange={handleOnChange}
                />
            </div>
        </div>
    )
}

export default Uploadfile