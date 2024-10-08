import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../../components/UI/Auth/Register';
import { IoCloseSharp } from "react-icons/io5";
import { RiUserAddFill } from "react-icons/ri";


interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  active: boolean;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);


  const closeModal = () => {
    setIsModalOpen(false);
   
  };

  const openModel = () =>{
    setIsModalOpen(true);
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<User[]>('http://localhost:5000/api/auth/allusers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:5000/api/auth/users/${userId}`, { active: !currentStatus ,  
        headers: {
        'Authorization': `Bearer ${token}`
      }});
      setUsers(users.map(user => user._id === userId ? { ...user, active: !currentStatus } : user));
      toast.success('User status updated successfully');
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Error updating user status');
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <button className='bg-btnprimary p-1 rounded font-semibold text-white flex items-center' onClick={openModel}> Create  <RiUserAddFill />
      </button>
      </div>
  
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.active ? 'Enabled' : 'Disabled'}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleUserStatus(user._id, user.active)}
                  className={`px-4 py-2 rounded ${user.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                  {user.active ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {isModalOpen && (
         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 h-full">
              <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-700 "><IoCloseSharp />

                </button>
              
              </div>
             
                
           {/* <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 h-full"> */}
           <Register/>
   
           </div>
          
          </div>
      )}
    </div>
  );
};

interface PaginationProps {
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map(number => (
          <li key={number} className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}>
            <button onClick={() => paginate(number)} className="px-3 py-1 border rounded">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserTable;
