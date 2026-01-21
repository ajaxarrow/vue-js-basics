import axios from "axios";
import type { Task } from "@/interfaces/tasks.interfaces";
import server from "@/plugins/axios";
import { ref } from "vue";


export const useTaskService = () => {
    const loading = ref(false);
    const getTasks = async (): Promise<Task[]>   => {
        try {
            loading.value = true;
            const response = await server.get('/tasks');
            loading.value = false;
            return response.data.data;
        } catch (error) {
            loading.value = false;
            throw new Error('Failed to fetch tasks');
        }
    }

    const changeTaskStatus = async (taskId: number, status: 'Not Started' | 'In Progress' | 'Completed'): Promise<Task> => {
        try {
            loading.value = true;
            const response = await server.patch(`/tasks/${taskId}`, { status });
            loading.value = false;
            return response.data.data;
        } catch (error) {
            loading.value = false;
            throw new Error('Failed to update task status');
        }
    }

    return {
        getTasks,
        changeTaskStatus
    }
}