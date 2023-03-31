import React, { useState, useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        toast.error(response.message);
        navigate('/login');
        return false;
      }
    } catch (error) {
      navigate('/login');
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    } else {
      navigate('/login');
    }
  }, []);

  console.log('user', user);

  return (
    <div className='h-screen w-screen bg-gray-100 p-2'>
      {/*header*/}
      <div className='flex justify-between p-5'>
        <div className='flex items-center gap-1'>
          <i className='ri-wechat-fill text-2xl'></i>
          <h1 className='text-primary text-2xl uppercase font-bold'>Chat</h1>
        </div>
        <div className='flex items-center gap-1'>
          <i class='ri-shield-user-line text-xl'></i>
          <h1 className='underline text-xl'>{user?.name}</h1>
        </div>
      </div>

      {/*content - pages*/}
      <div className='p-5'>{children}</div>
    </div>
  );
};
export default ProtectedRoute;
