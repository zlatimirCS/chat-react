import React from 'react';
import { useSelector } from 'react-redux';

const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  console.log('selectedChat', selectedChat);
  const receipentUser = selectedChat.members.find(
    (mem) => mem._id !== user._id
  );
  console.log('receipentUser', receipentUser);
  return (
    <div className='bg-white h-[85vh] border rounded-2xl w-full flex flex-col justify-between p-5'>
      {/*1st part receipent user*/}
      <div>Receipent user</div>

      {/*2nd part chat messages*/}
      <div>Chat messages</div>

      {/*3rd part chat input*/}
      <div>Chat input</div>
    </div>
  );
};
export default ChatArea;
