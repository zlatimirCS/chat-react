import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CreateNewChat, GetAllChats } from '../../../apicalls/chats';
import { useDispatch } from 'react-redux';
import { SetAllChats, SetSelectedChat } from '../../../redux/userSlice';
import { toast } from 'react-hot-toast';
import { showLoader, hideLoader } from '../../../redux/loaderSlice';
import moment from 'moment';

const UsersList = ({ searchKey }) => {
  const dispatch = useDispatch();
  let { allUsers, allChats, user, selectedChat, messagesRead, refetch } =
    useSelector((state) => state.userReducer);

  const addNewChat = async (rUserId) => {
    try {
      dispatch(showLoader());
      const response = await CreateNewChat([user._id, rUserId]);
      const response1 = await GetAllChats();
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message);
        dispatch(SetAllChats(response1.data));
        const chat = response1.data.find(
          (chat) =>
            chat.members.map((mem) => mem._id).includes(rUserId) &&
            chat.members.map((mem) => mem._id).includes(user._id)
        );
        dispatch(SetSelectedChat(chat));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const openChat = (rUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.map((mem) => mem._id).includes(rUserId._id) &&
        chat.members.map((mem) => mem._id).includes(user._id)
    );
    if (chat) {
      dispatch(SetSelectedChat(chat));
    }
  };

  const isSelectedChat = (rUserId) => {
    if (selectedChat) {
      return selectedChat.members.map((mem) => mem._id).includes(rUserId._id);
    }
    return false;
  };

  const getLastMsg = (rUserId) => {
    const chat = allChats.find((chat) =>
      chat.members.map((mem) => mem._id).includes(rUserId)
    );

    if (chat && chat.lastMessage) {
      const lastMsgSender =
        chat?.lastMessage?.sender === user._id ? 'You:' : '';
      return (
        <div className='flex justify-between w-full'>
          <h1 className='text-gray-600 text-sm'>
            {lastMsgSender} {chat?.lastMessage?.text}
          </h1>
          <h1 className='text-gray-500 text-sm ml-auto'>
            {moment(chat?.lastMessage?.createdAt).format('hh:mm A')}
          </h1>
        </div>
      );
    }
    if (!chat) {
      return '';
    }
    return null;
  };

  const getUnreadMessages = (rUserId) => {
    const chat = allChats.find((chat) =>
      chat.members.map((mem) => mem._id).includes(rUserId)
    );
    if (
      chat &&
      chat.unreadMessages &&
      chat?.lastMessage?.sender !== user._id &&
      !messagesRead
    ) {
      return (
        <div className='bg-primary text-white text-xs px-1 rounded-full flex justify-center items-center w-5 h-5'>
          {chat.unreadMessages}
        </div>
      );
    }
    return null;
  };

  const getData = () => {
    const test = allUsers.filter(
      (userObj) =>
        (userObj.name.toLowerCase().includes(searchKey.toLowerCase()) &&
          searchKey) ||
        allChats.some((chatObj) =>
          chatObj.members.map((mem) => mem._id).includes(userObj._id)
        )
    );
    // sort users by last message
    test.sort((a, b) => {
      const aChat = allChats.find((chat) =>
        chat.members.map((mem) => mem._id).includes(a._id)
      );
      const bChat = allChats.find((chat) =>
        chat.members.map((mem) => mem._id).includes(b._id)
      );
      if (aChat && bChat) {
        const aDate = new Date(aChat?.updatedAt);
        const bDate = new Date(bChat?.updatedAt);
        return bDate - aDate;
      }
      if (aChat && !bChat) {
        return -1;
      }
      if (!aChat && bChat) {
        return 1;
      }
      return 0;
    });

    return test;
  };

  return (
    <div className='flex flex-col gap-3 mt-5 w-96'>
      {getData().map((userObj) => {
        return (
          <div
            key={userObj._id}
            // className='shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center cursor-pointer'
            className={`shadow-sm border p-5 rounded-2xl flex items-center cursor-pointer bg-white w-full ${
              isSelectedChat(userObj) ? 'border-primary' : 'border-gray-300'
            }`}
            onClick={() => openChat(userObj)}
          >
            <div className='flex gap-2 items-center w-full '>
              {userObj.profilePic ? (
                <img
                  src={userObj.profilePic}
                  alt='profile pic'
                  className='rounded-full w-10 h-10'
                />
              ) : null}
              {!userObj.profilePic && (
                <div className='bg-gray-500 rounded-full flex items-center justify-center w-10 h-10'>
                  <h1 className='uppercase text-xl font-bold text-white'>
                    {userObj.name[0]}
                  </h1>
                </div>
              )}
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex gap-3 items-center'>
                  <h1>{userObj.name}</h1>
                  {getUnreadMessages(userObj._id)}
                </div>
                {getLastMsg(userObj._id)}
              </div>
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
