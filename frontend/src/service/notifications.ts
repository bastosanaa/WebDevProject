import axios from "axios";
import api from "./axiosInstance";

export interface CreateNotificationParams {
  destinatarioEmail: string;
  mensagem: string;
  tipo: "convite_amizade" | "convite_tarefa_grupo";
}
export const createNotification = async (params: CreateNotificationParams) => {
  try {
    const response = await api.post("notificacoes/post", params);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to create notificação");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const sendAddFriendReq = async (email: string) => {
  return createNotification({
    destinatarioEmail: email,
    mensagem: "",
    tipo: "convite_amizade",
  });
};
