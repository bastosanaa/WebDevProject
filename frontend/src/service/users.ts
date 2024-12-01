import axios from "axios";
import { apiBaseUrl } from "./serviceConsts";

const entityBaseUrl = apiBaseUrl + "/usuarios";

// Service functions
export const createUser = async (userData: {
  nome: string;
  email: string;
  senha: string;
}) => {
  try {
    const response = await axios.post(`${entityBaseUrl}/post`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateUser = async (
  id: string,
  userData: { nome?: string; email?: string; senha?: string }
) => {
  try {
    const response = await axios.patch(
      `${entityBaseUrl}/update/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to update user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${entityBaseUrl}/delete/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${entityBaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to get user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginUser = async (credentials: {
  email: string;
  senha: string;
}) => {
  try {
    const response = await axios.post(`${entityBaseUrl}/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to login");
    }
    throw new Error("An unexpected error occurred");
  }
};
