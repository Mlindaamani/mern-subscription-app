import create from "zustand";
import { axiosInstance } from "../config/axios";
import { getBackendErrorMessage } from "../utils/functions";
import toast from "react-hot-toast";

export const messageStore = create((set, get) => ({
  messages: [],
  users: [],
  selected: null,

  setSelectedUser: (userToChatWith) => {
    set({ selected: userToChatWith });
  },

  sendNewMessage: async (message) => {
    const { selected, messages } = get();
    try {
      if (!selected) {
        toast.error("Please select a user to chat with.");
        return;
      }

      const { data: newMessage } = await axiosInstance.post(
        `/messages/send/${selected._id}`,
        {
          message,
        }
      );
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  getMessages: async () => {
    const { selected } = get();
    try {
      if (selected._id) {
        const { data } = await axiosInstance.get(
          `/messages/messages-between-users/${selected._id}`
        );
        set({ messages: data });
      }
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  getChatUsers: async () => {
    try {
      const { data } = await axiosInstance.get("/users/chat-users/");
      set({ users: data });
    } catch (error) {
      console.error(getBackendErrorMessage(error));
    }
  },

  // New method to add a message
  addMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
