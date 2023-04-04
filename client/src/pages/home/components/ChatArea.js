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
      <div>
        <div className='flex gap-2 items-center mb-2'>
          {receipentUser.profilePic ? (
            <img
              src={receipentUser.profilePic}
              alt='profile pic'
              className='w-10 h-10 rounded-full'
            />
          ) : null}
          {!receipentUser.profilePic && (
            <div className='bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center'>
              <h1 className='uppercase text-2xl font-bold text-white'>
                {receipentUser.name[0]}
              </h1>
            </div>
          )}
          <h1 className='uppercase'>{receipentUser.name}</h1>
        </div>
        <hr />
      </div>

      {/*2nd part chat messages*/}
      <div>Chat messages</div>

      {/*3rd part chat input*/}
      <div>
        <div className='h-16 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center'>
          <input
            type='text'
            placeholder='Type a message'
            className='w-[90%] border-0 h-full rounded-xl focus:border-none'
          />
          <button className='bg-primary text-white p-2 rounded h-max'>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatArea;
