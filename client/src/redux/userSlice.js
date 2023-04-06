import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    allUsers: [],
    allChats: [],
    selectedChat: null,
    messagesRead: false,
    refetch: false,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    SetAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    SetSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    SetMessagesRead: (state, action) => {
      state.messagesRead = action.payload;
    },
    SetRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const {
  SetUser,
  SetAllUsers,
  SetAllChats,
  SetSelectedChat,
  SetMessagesRead,
  SetRefetch,
} = userSlice.actions;
export default userSlice.reducer;
