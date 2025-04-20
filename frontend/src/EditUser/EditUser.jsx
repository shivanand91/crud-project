import axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser = () => {

    const users = {
        name: '',
        email: '',
        address: '',
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const { id } = useParams();
    


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value})
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
            setUser(response.data)
            })
            .catch((error) => {
                console.error(error);
                });
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_API_URL}/api/update/user/${id}`, user)
            .then((response) => {
            toast.success(response.data.message, {position: "top-right"});
            navigate("/")
            })
            .catch(() => {
            console.log("Error in creating user");
        })
    } 

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={submitForm} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md animate-fadeIn">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Update User Details</h2>
                <div className="mb-2">
                    <label className="block text-gray-600 mb-2" htmlFor='name'>Name</label>
                    <input
                        type="text"
                        name='name'
                        value={user.name}
                        onChange={inputHandler}
                        autoComplete='off'
                        required
                        placeholder="Enter your name"
                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-600 mb-2" htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name='email'
                        value={user.email}
                        onChange={inputHandler}
                        autoComplete='off'
                        required
                        placeholder="Enter email"
                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-600 mb-2" htmlFor='address'>Address</label>
                    <input
                        type="text"
                        name='address'
                        value={user.address}
                        autoComplete='off'
                        onChange={inputHandler}
                        required
                        placeholder="Enter address"
                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
                <Link
                    to="/"
                    type='button'
                    style={{textDecoration: "none"}}
                    className="w-full mt-2 bg-gray-500 text-center text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
                >
                    Back
                </Link>
            </form>
        </div>
    );
};

export default EditUser;