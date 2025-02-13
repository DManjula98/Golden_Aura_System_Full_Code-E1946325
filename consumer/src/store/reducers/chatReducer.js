import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (information, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.post('/chat/customer/add-customer-friend', information)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const send_message = createAsyncThunk(
    'chat/send_message',
    async (information, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.post('/chat/customer/send-message-to-seller', information)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
        fd_messages: [],
        currentFd: "",
        successMessage: "",
        errorMessage : ""
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
        state.fd_messages = [...state.fd_messages, payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(add_friend.fulfilled, (state, { payload }) => {
        state.fd_messages = payload.messages
        state.currentFd = payload.currentFd
        state.my_friends = payload.myFriends
    });
    builder.addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends
        let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
        while (index > 0) {
            let temp = tempFriends[index]
            tempFriends[index] = tempFriends[index - 1]
            tempFriends[index - 1] = temp
            index--
        }
        state.my_friends = tempFriends
        state.fd_messages = [...state.fd_messages, payload.message]
        state.successMessage = 'Message Send Successfully'
    });
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
