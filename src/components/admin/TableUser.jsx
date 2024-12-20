import React, { useState, useEffect } from 'react'
import { getListAllUser, changeUserStatus, changeUserRole } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUser = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUser(token)
            .then((res) => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserStatus = async (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }

        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Status Successed!')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserRole = async (userId, userRole) => {
        console.log(userId, userRole)
        const value = {
            id: userId,
            role: userRole
        }

        changeUserRole(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Role Successed!')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStutusColor = (status) => {
        switch (status) {
            case "Active":
                return 'bg-green-200';
            case "Inactive":
                return 'bg-red-200';
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md rounded-md'>
            <div>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='p-2 text-center border'>ลำดับ</th>
                            <th className='p-2 text-center border'>ผู้ใช้งาน</th>
                            <th className='p-2 text-center border'>ที่อยู่</th>
                            <th className='p-2 text-center border'>บทบาท</th>
                            <th className='p-2 text-center border'>สถานะ</th>
                            <th className='p-2 text-center border'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((item, index) => {
                                return (
                                    <tr key={index} className='border hover:bg-gray-100'>
                                        <td className='text-center p-2 border'>{item.id}</td>
                                        <td className='p-2 border'>
                                            <p className='font-medium'>{item.email}</p>
                                        </td>
                                        <td className='p-2 border'>
                                            <p className='font-medium'>{item.address}</p>
                                        </td>
                                        <td className='text-center p-2 border'>
                                            <select
                                                value={item.role}
                                                onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                                            >
                                                <option>user</option>
                                                <option>admin</option>
                                            </select>
                                        </td>
                                        <td className={`${getStutusColor(item.enabled ? "Active" : "Inactive")} text-center p-2 border border-gray-300`}>
                                        {item.enabled ? "Active" : "Inactive"}
                                        </td>
                                        <td className='text-center p-2 border'>
                                            <button
                                                className='bg-yellow-500 text-white rounded-full px-2 py-1'
                                                onClick={() => handleChangeUserStatus(item.id, item.enabled)}>
                                                {item.enabled ? "Disable" : 'Enable'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableUser