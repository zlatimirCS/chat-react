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
    <div>
      {user?.name}
      {children}
    </div>
  );
};
export default ProtectedRoute;
