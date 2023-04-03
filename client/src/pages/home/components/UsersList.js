import React from 'react';
import { useSelector } from 'react-redux';

const UsersList = ({ searchKey }) => {
  let { allUsers } = useSelector((state) => state.userReducer);
  let { allChats } = useSelector((state) => state.userReducer);
  console.log('all Chats', allChats);

  return (
    <div className='flex flex-col gap-3 mt-5'>
      {allUsers
        .filter(
          (user) =>
            user.name.toLowerCase().includes(searchKey.toLowerCase()) &&
            searchKey
        )
        .map((user) => {
          return (
            <div
              key={user._id}
              className='shadow-sm border p-5 rounded-2xl bg-white'
            >
              <div className='flex gap-2 items-center'>
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt='profile pic'
                    className='w-10 h-10 rounded-full'
                  />
                ) : null}
                {!user.profilePic && (
                  <div className='bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center'>
                    <h1 className='uppercase text-2xl font-bold text-white'>
                      {user.name[0]}
                    </h1>
                  </div>
                )}
                <h1>{user.name}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default UsersList;
