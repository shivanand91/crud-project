import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUser(response.data);
            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };
        fetchUser();
    }, []);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
            .then((response) => {
                setUser((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success("user deleted successfully")
            })
            .catch((error) => {
                console.log("Error while deleting the user", error);
            });
    }

    return (
        <div className='p-4 rounded-md bg-gray-100'>

            <Link to="/addUser" type='button' style={{ textDecoration: "none" }} className='bg-blue-700 px-4 py-2 mb-4 rounded text-white font-bold hover:bg-blue-800 no-underline'>
                Add User
            </Link>

            {users.length === 0 ?
                (
                    <div className='text-center w-[90vh]'>
                        <div className='text-gray-500 text-xl'>
                            No users found
                        </div>
                        <p className='text-gray-500 text-md'>Add New User</p>
                    </div>
                ) :
                (
                    <table className='w-full border-collapse border border-gray-300 bg-white shadow-md'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='border border-gray-300 px-4 py-2 text-left'>S.No.</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Name</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Email</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Address</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className='hover:bg-gray-100'>
                                    <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{user.address}</td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        <div className='flex gap-2'>
                                            <Link type='button' to={`/editUser/` + user._id} style={{ textDecoration: "none" }} className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2'>
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteUser(user._id)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

        </div>
    );
};

export default User;