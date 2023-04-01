import React, { useState } from 'react';
import UserSearch from './components/UserSearch';
import ChatArea from './components/ChatArea';

const Home = () => {
  const [searchKey, setSearchKey] = useState('');
  return (
    <div className='flex gap-5'>
      {/*first part - user search, users list, chat list*/}
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
      </div>
      {/*second part*/}
      <div>
        <ChatArea />
      </div>
    </div>
  );
};
export default Home;
