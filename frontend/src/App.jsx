import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import User from './getUser/User'
import AddUser from './addUser/AddUser';
import EditUser from './EditUser/EditUser';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <User />,
    },
    {
      path: '/addUser',
      element: <AddUser />,
    },
    {
      path: "/editUser/:id",
      element: <EditUser />,
    }
  ]);

  return (
    <>
      <div className='bg-gray-200 flex flex-col items-center justify-center h-screen w-screen'>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  )
}

export default App
