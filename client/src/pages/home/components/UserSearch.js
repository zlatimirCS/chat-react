import React from 'react';

const UserSearch = ({ searchKey, setSearchKey }) => {
  return (
    <div className='relative'>
      <i className='ri-search-line absolute top-2 left-4 text-gray-300'></i>
      <input
        type='text'
        placeholder='Search users/chats'
        className='rounded-full w-full border-gray-300 pl-10 text-gray-500'
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
};
export default UserSearch;
