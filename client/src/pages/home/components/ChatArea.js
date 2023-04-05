import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SendMessage } from '../../../apicalls/messages';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../../redux/loaderSlice';
import { toast } from 'react-hot-toast';
import { GetMessages } from '../../../apicalls/messages';
import moment from 'moment';

const ChatArea = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  console.log('selectedChat', selectedChat);
  const receipentUser = selectedChat.members.find(
    (mem) => mem._id !== user._id
  );
  console.log('receipentUser', receipentUser);

  const sendNewMessage = async () => {
    try {
      // dispatch(showLoader());
      const message = {
        sender: user._id,
        chat: selectedChat._id,
        text: newMessage,
      };
      const response = await SendMessage(message);
      const response1 = await GetMessages(selectedChat._id);
      // dispatch(hideLoader());
      if (response.success) {
        setNewMessage('');
        setMessages(response1.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    if (selectedChat) {
      try {
        dispatch(showLoader());
        const response = await GetMessages(selectedChat._id);
        console.log('response', response);
        dispatch(hideLoader());
        if (response.success) {
          setMessages(response.data);
        }
      } catch (error) {
        dispatch(hideLoader());
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  console.log('messages', messages);
  return (
    <div className='bg-white h-[85vh] border rounded-2xl w-full flex flex-col p-5'>
      <div style={{ flex: 1, overflowY: 'scroll' }}>
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
        <div className='mt-5 mb-5'>
          <div className='flex flex-col gap-2'>
            {messages.map((message) => {
              const isCurrentUserSender = message.sender === user._id;
              return (
                <div className={`flex ${isCurrentUserSender && 'justify-end'}`}>
                  <div className='flex flex-col gap-1'>
                    <h1
                      className={`${
                        isCurrentUserSender
                          ? 'bg-primary text-white rounded-bl-none'
                          : 'bg-gray-200 text-primary rounded-tr-none'
                      } p-2 rounded-xl`}
                    >
                      {message.text}
                    </h1>
                    <h1 className='text-gray-500 text-sm'>
                      {moment(message.createdAt).format('hh:mm A')}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*3rd part chat input*/}
      <div>
        <div className='h-16 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center'>
          <input
            type='text'
            placeholder='Type a message'
            className='w-[90%] border-0 h-full rounded-xl focus:border-none'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className='bg-primary text-white p-2 rounded h-max'
            onClick={sendNewMessage}
          >
            <i className='ri-send-plane-2-line'></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatArea;
