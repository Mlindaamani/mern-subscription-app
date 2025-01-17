import create from "zustand";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";
import { getBackendErrorMessage } from "../utils/functions";

export const videoStore = create((set) => ({
  loading: false,
  video: {},
  videos: [],

  uploadVideo: async (formData, navigate) => {
    set({ loading: true });
    try {
      const { message } = (
        await axiosInstance.post("/videos/upload/", formData)
      ).data;

      set({ loading: false });

      toast.success(message, {
        duration: 2000,
        position: "bottom-right",
        id: "video",
      });
      navigate("/videos");
    } catch (error) {
      set({ loading: false });
      toast.error(getBackendErrorMessage(error), {
        duration: 2000,
        position: "top-right",
        id: "video",
      });
    }
  },

  fetchVideos: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get("/videos/");
      set({ videos: data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(getBackendErrorMessage(error), {
        duration: 2000,
        position: "top-center",
        id: "video",
      });
    }
  },

  fetchVideoById: async (videoId) => {
    try {
      const { video } = (await axiosInstance.get(`/videos/${videoId}`)).data;

      set({ video: video, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(getBackendErrorMessage(error), {
        duration: 4000,
        position: "top-center",
        id: "video",
      });
    }
  },

  downloadVideo: async (videoId) => {
    try {
      const { data } = await axiosInstance.get(`/videos/download/${videoId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dev-steve@backend.mp4");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download will start now!", {
        duration: 2000,
        position: "top-right",
        id: "video",
      });
    } catch (error) {
      toast.error(getBackendErrorMessage(error), {
        duration: 2000,
        position: "top-center",
        id: "video",
      });
    }
  },
}));

//MessageId for Zena Wilson : 677723b2d5bf3be939321230
