import React from 'react';
import { useSelector } from 'react-redux';
import { CreateNewChat, GetAllChats } from '../../../apicalls/chats';
import { useDispatch } from 'react-redux';
import { SetAllChats, SetSelectedChat } from '../../../redux/userSlice';
import { toast } from 'react-hot-toast';
import { showLoader, hideLoader } from '../../../redux/loaderSlice';

const UsersList = ({ searchKey }) => {
  const dispatch = useDispatch();
  let { allUsers, allChats, user, selectedChat } = useSelector(
    (state) => state.userReducer
  );
  console.log('allChats', allChats);

  const addNewChat = async (rUserId) => {
    try {
      dispatch(showLoader());
      const response = await CreateNewChat([user._id, rUserId]);
      const response1 = await GetAllChats();
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        // const newAllChats = [...allChats, newChat];
        // dispatch(SetAllChats(newAllChats));
        dispatch(SetSelectedChat(newChat));
        dispatch(SetAllChats(response1.data));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const openChat = (rUserId) => {
    console.log('open open');
    const chat = allChats.find(
      (chat) =>
        chat.members.map((mem) => mem._id).includes(rUserId) &&
        chat.members.map((mem) => mem._id).includes(user._id)
    );
    if (chat) {
      dispatch(SetSelectedChat(chat));
    }
  };

  const getData = () => {
    return allUsers.filter(
      (userObj) =>
        (userObj.name.toLowerCase().includes(searchKey.toLowerCase()) &&
          searchKey) ||
        allChats.some((chatObj) =>
          chatObj.members.map((mem) => mem._id).includes(userObj._id)
        )
    );
  };

  return (
    <div className='flex flex-col gap-3 mt-5'>
      {getData().map((userObj) => {
        return (
          <div
            key={userObj._id}
            className='shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center cursor-pointer'
            onClick={() => openChat(userObj._id)}
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
            <div onClick={() => addNewChat(userObj._id)}>
              {!allChats.find((chatObj) =>
                chatObj.members.map((mem) => mem._id).includes(userObj._id)
              ) && (
                <button className='border-primary border text-primary bg-white p-2 rounded'>
                  Create Chat
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default UsersList;
