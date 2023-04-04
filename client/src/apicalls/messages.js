import { axiosInstance } from '.';

export const SendMessage = async (message) => {
  try {
    const response = await axiosInstance.post(
      '/api/messages/new-message',
      message
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `/api/messages/get-all-messages/${chatId}`
    );
    console.log('response111', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
