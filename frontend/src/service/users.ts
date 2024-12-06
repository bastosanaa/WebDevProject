import axios from "axios";
import { apiBaseUrl } from "./serviceConsts";
import { getTokenFromLocalStorage } from "../utils/getTokenFromLocalStorage";

const entityBaseUrl = apiBaseUrl + "/usuarios";

export interface LoginResponse {
  auth: boolean;
  msg: string;
  token: string;
}

/**
 * Atualiza um usuário existente.
 * @param id - O ID do usuário a ser atualizado.
 * @param userData - Os dados do usuário a serem atualizados.
 */

// remover parametro id já que estou utilizando o token para puxar o id no backend
export const updateUser = async (
  id: string,
  userData: { nome?: string; email?: string; senha?: string }
) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios.patch(
      `${entityBaseUrl}/update/${id}`,
      userData,
      {
        headers: {
          Authorization: token, // Passando o token sem o "Bearer"
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to update user");
    }
    throw new Error("An unexpected error occurred");
  }
};

/**
 * Deleta um usuário pelo ID.
 * @param id - O ID do usuário a ser deletado.
 */

// remover parametro id já que estou utilizando o token para puxar o id no backend
export const deleteUser = async (id: string) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios.delete(`${entityBaseUrl}/delete/${id}`, {
      headers: {
        Authorization: token, // Passando o token sem o "Bearer"
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};

/**
 * Recupera os dados de um usuário pelo ID.
 * @param id - O ID do usuário a ser recuperado.
 */
export const getUser = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(`${entityBaseUrl}/getUsuario`, {
      headers: {
        Authorization: token, // Passando o token sem o "Bearer"
      },
    });
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
    const response = await axios.post(
      `${apiBaseUrl}/autenticacao/usuarios`,
      credentials
    );
    return response.data as LoginResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to login");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createUser = async (userData: {
  nome: string;
  email: string;
  senha: string;
}) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/novousuario/post`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};
