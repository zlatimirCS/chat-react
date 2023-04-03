import React, { useState } from 'react';
import UserSearch from './components/UserSearch';
import ChatArea from './components/ChatArea';
import UsersList from './components/UsersList';

const Home = () => {
  const [searchKey, setSearchKey] = useState('');
  return (
    <div className='flex gap-5'>
      {/*first part - user search, users list, chat list*/}
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      {/*second part*/}
      <div>
        <ChatArea />
      </div>
    </div>
  );
};
export default Home;
