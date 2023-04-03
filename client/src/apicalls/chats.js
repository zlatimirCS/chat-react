import { axiosInstance } from '.';

export const GetAllChats = async () => {
  try {
    const response = await axiosInstance.get('/api/chats/get-all-chats');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateNewChat = async (members) => {
  console.log('members', members);
  try {
    const response = await axiosInstance.post('/api/chats/create-new-chat', {
      members,
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
