import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async () => {
    try {
      const response = await RegisterUser(user);
      if (response.success) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('fail', error.message);
    }
  };
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
