import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../redux/loaderSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async () => {
    try {
      dispatch(showLoader());
      const response = await RegisterUser(user);
      if (response.success) {
        toast.success('Successfully registered!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96'>
        <h1 className='text-2xl font-semibold uppercase text-primary'>
          Chat register
        </h1>
        <hr />
        <input
          type='text'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder='Name'
        />
        <input
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Email'
        />
        <input
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Password'
        />
        <button className='contained-btn' onClick={registerUser}>
          Register
        </button>
        <Link to='/login' className='underline'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};
export default Register;
