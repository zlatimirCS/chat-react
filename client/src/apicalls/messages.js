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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ClearUnreadMessages = async (chatId) => {
  try {
    const response = await axiosInstance.post(
      `/api/messages/clear-unread-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessages = async () => {
  try {
    const response = await axiosInstance.get(`/api/messages/get-all-messages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
