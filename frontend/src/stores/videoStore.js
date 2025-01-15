import create from "zustand";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";

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
      toast.error(error.response.data.message, {
        duration: 2000,
        position: "top-right",
        id: "video",
      });
    }
  },

  fetchVideos: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/videos/");
      set({ videos: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message, {
        duration: 2000,
        position: "top-center",
        id: "video",
      });
    }
  },

  fetchVideoById: async (videoId) => {
    try {
      const response = await axiosInstance.get(`/videos/${videoId}`);
      set({ video: response.data.video, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-center",
        id: "video",
      });
    }
  },

  downloadVideo: async (videoId) => {
    try {
      const response = await axiosInstance.get(`/videos/download/${videoId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "devsteve.mp4");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download will start now!", {
        duration: 2000,
        position: "top-right",
        id: "video",
      });
    } catch (error) {
      toast.error("Failed to download video", {
        duration: 2000,
        position: "top-center",
        id: "video",
      });
    }
  },
}));
