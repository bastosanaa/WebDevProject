import axios from "axios";
import api from "./axiosInstance";

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
export const updateUser = async (userData: {
  nome?: string;
  email?: string;
  senha?: string;
}) => {
  try {
    const response = await api.patch("usuarios/update", userData);
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
    const response = await api.delete(`usuarios/delete/${id}`);
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
    const response = await api.get(`usuarios/getUsuario`);
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
    const response = await api.post("autenticacao/usuarios", credentials);
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
    const response = await api.post("novousuario/post", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};

/**
 * Deleta um amigo pelo ID.
 * @param friendId - O ID do amigo a ser deletado.
 */

// remover parametro id já que estou utilizando o token para puxar o id no backend
export const deleteFriend = async (friendId: string) => {
  try {
    const response = await api.patch("usuarios/removeAmigo", {
      amigo_id: friendId,
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
 * Adiciona tarefa em grupo
 * @param taskId - O ID da tarefa a ser adicionada.
 */

// remover parametro id já que estou utilizando o token para puxar o id no backend
export const addEmTarefaEmGrupo = async (taskId: string) => {
  try {
    const response = await api.patch("usuarios/addTarefaGrupo", taskId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};
