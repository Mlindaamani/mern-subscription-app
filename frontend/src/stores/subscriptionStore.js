import toast from "react-hot-toast";
import create from "zustand";
import { axiosInstance } from "../config/axios";

export const subscriptionStore = create((set) => ({
  loading: false,
  subscribe: async (plan, navigate) => {
    if (!plan) return toast.error("Please select a plan!");

    set({ loading: true, error: null });

    try {
      await axiosInstance.post("/subscription/subscribe/", {
        plan,
      });

      set({ loading: false });
      toast.success(`Success! Subscribed to ${plan}`, {
        duration: 2000,
        id: "register",
      });
      navigate("/videos");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message, {
        duration: 2000,
        position: "top-center",
        id: "subscription",
      });
    }
  },
}));
