import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginUser = async () => {
    console.log(user);
  };
  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96'>
        <h1 className='text-2xl font-semibold uppercase text-primary'>
          Chat login
        </h1>
        <hr />
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
        <button className='contained-btn' onClick={loginUser}>
          Login
        </button>
        <Link to='/register' className='underline'>
          Dont have an account? Register
        </Link>
      </div>
    </div>
  );
};
export default Login;
