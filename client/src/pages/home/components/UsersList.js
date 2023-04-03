import React from 'react';
import { useSelector } from 'react-redux';

const UsersList = ({ searchKey }) => {
  let { allUsers, allChats } = useSelector((state) => state.userReducer);
  console.log('all Chats', allChats);

  return (
    <div className='flex flex-col gap-3 mt-5'>
      {allUsers
        .filter(
          (userObj) =>
            userObj.name.toLowerCase().includes(searchKey.toLowerCase()) &&
            searchKey
        )
        .map((userObj) => {
          return (
            <div
              key={userObj._id}
              className='shadow-sm border p-5 rounded-2xl bg-white'
            >
              <div className='flex gap-2 items-center'>
                {userObj.profilePic ? (
                  <img
                    src={userObj.profilePic}
                    alt='profile pic'
                    className='w-10 h-10 rounded-full'
                  />
                ) : null}
                {!userObj.profilePic && (
                  <div className='bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center'>
                    <h1 className='uppercase text-2xl font-bold text-white'>
                      {userObj.name[0]}
                    </h1>
                  </div>
                )}
                <h1>{userObj.name}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default UsersList;
