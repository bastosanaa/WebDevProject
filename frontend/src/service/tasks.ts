import axios from "axios";
import { apiBaseUrl } from "./serviceConsts";
import { getTokenFromLocalStorage } from "../utils/getTokenFromLocalStorage";
const entityBaseUrl = apiBaseUrl + "/tarefas";

// Service functions

/**
 * Create a new task for a specific user.
 * @param usuarioId - The ID of the user creating the task.
 * @param taskData - The task data to be created.
 */
export const createTask = async (
    usuarioId: string,
    taskData: { titulo: string; meta_tempo?: string; data_termino?: string; em_grupo?: boolean; membros?: string[] }
) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.post(`${entityBaseUrl}/post/${usuarioId}`, taskData, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || new Error("Failed to create task");
        }
        throw new Error("An unexpected error occurred");
    }
};

/**
 * Update a task by its ID.
 * @param taskId - The ID of the task to be updated.
 * @param taskData - The updated task data.
 */
export const updateTask = async (
    taskId: string,
    taskData: { titulo?: string; meta_tempo?: string; data_termino?: string; em_grupo?: boolean; membros?: string[] }
) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.patch(`${entityBaseUrl}/update/${taskId}`, taskData, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || new Error("Failed to update task");
        }
        throw new Error("An unexpected error occurred");
    }
};

/**
 * Delete a task by its ID.
 * @param taskId - The ID of the task to be deleted.
 */
export const deleteTask = async (taskId: string) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.delete(`${entityBaseUrl}/delete/${taskId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || new Error("Failed to delete task");
        }
        throw new Error("An unexpected error occurred");
    }
};

/**
 * Get a task by its ID.
 * @param taskId - The ID of the task to retrieve.
 */
export const getTask = async (taskId: string) => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.get(`${entityBaseUrl}/${taskId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || new Error("Failed to retrieve task");
        }
        throw new Error("An unexpected error occurred");
    }
};
