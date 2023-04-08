import React, { useState } from 'react';
import UserSearch from './components/UserSearch';
import ChatArea from './components/ChatArea';
import UsersList from './components/UsersList';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Home = () => {
  const socket = io('http://localhost:5000');
  const [searchKey, setSearchKey] = useState('');
  const { selectedChat } = useSelector((state) => state.userReducer);
  return (
    <div className='flex gap-5'>
      {/*first part - user search, users list, chat list*/}
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      {/*second part*/}
      <div className='w-full'>{selectedChat && <ChatArea />}</div>
    </div>
  );
};
export default Home;
