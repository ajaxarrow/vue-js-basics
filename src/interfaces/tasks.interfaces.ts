interface Task{
    id: number;
    title: string;
    description?: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    created_at: string;
    updated_at: string;
}

export type { Task };