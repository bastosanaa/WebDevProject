import axios from "axios";
import api from "./axiosInstance";

export interface Notification {
  createdAt: string;
  destinatario: string;
  mensagem: string;
  remetente: {
    _id: string;
    nome: string;
  };
  status: "pendente" | "aceito" | "recusado";
  tipo: "convite_amizade" | "convite_tarefa_grupo";
  updatedAt: string;
  _id: string;
}

export interface CreateNotificationParams {
  destinatarioEmail: string;
  mensagem: string;
  tipo: Notification["tipo"];
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

export interface GetNotificationsResponse {
  msg: string;
  notificacoes: Notification[];
}

export const getNotifications = async () => {
  try {
    const response = await api.get("notificacoes/getNotifications");
    return response.data as GetNotificationsResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to get notifications");
    }
    throw new Error("An unexpected error occurred");
  }
};

export interface UpdateStatusParams {
  status: "pendente" | "aceito" | "recusado";
}
export const updateStatus = async (
  id: string,
  status: Notification["status"]
) => {
  try {
    const response = await api.patch(`notificacoes/updateStatus/${id}`, {
      status,
    });
    console.log("response", response);
    return response.data as GetNotificationsResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to get notifications");
    }
    throw new Error("An unexpected error occurred");
  }
};
