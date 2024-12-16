import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../service/api/axiosConfigue";
import {
  CREATEBLOG,
  DELETEBLOGS,
  DISLIKEBLOGS,
  GETBLOGS,
  GETUESRPROFILE,
  GETUSERBLOGS,
  LIKEBLOGS,
  USERLOGIN,
  USERLOGOUT,
  USERSIGNUP,
  VIEWBLOGS,
} from "../../service/api/api";
import { AxiosError } from "axios";
import { IUser, IUserProfile } from "../../utils/types/signUPUser";

export const signUpUser = createAsyncThunk(
  "user/singUpUser",
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERSIGNUP, userData);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(USERLOGIN, userData);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GETUESRPROFILE);
      console.log(response.data);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (userData: IUserProfile, { rejectWithValue }) => {
    try {
      alert("hi");
      const response = await axiosInstance.put(GETUESRPROFILE, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(USERLOGOUT);
      return response.data;
    } catch (error) {
      let errorMessage = "Network error. try again later.";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const crateBlog = createAsyncThunk(
  "user/crateBlog",
  async (blogData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(CREATEBLOG, blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      alert("got error");
      console.log(error);
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const getBlogs = createAsyncThunk(
  "user/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GETBLOGS);
      return response.data;
    } catch (error) {
      alert("got error");
      console.log(error);
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const getUserBlogs = createAsyncThunk(
  "user/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      alert("hit");
      const response = await axiosInstance.get(GETUSERBLOGS);
      return response.data;
    } catch (error) {
      alert("got error");
      console.log(error);
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOneBlog = createAsyncThunk(
  "user/fetchOneBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${VIEWBLOGS}/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const DeleteBlog = createAsyncThunk(
  "user/DeleteBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`${DELETEBLOGS}/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const blogLike = createAsyncThunk(
  "user/blogLike",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${LIKEBLOGS}/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const blogDisLike = createAsyncThunk(
  "user/blogDisLike",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${DISLIKEBLOGS}/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
