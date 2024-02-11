import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "./axiosConfig";

async function getData(endpoint) {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}

async function postData(endpoint, data) {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(` ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Error: No response received from the server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
    throw error;
  }
}

async function deleteData(endpoint) {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function updateData(endpoint, data) {
  try {
    console.log(data);
    const response = await axiosInstance.patch(endpoint, data);
    return response?.data;
  } catch (error) {
    toast.error('Error:', error.message);
    throw error;
  }
}

export { getData, postData, deleteData, updateData };
