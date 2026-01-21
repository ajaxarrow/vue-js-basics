<script setup lang="ts">
import { useTaskService } from '@/services/tasks.service';
import { onMounted, ref, watch } from 'vue';
import StatCard from '@/components/Tasks/StatCard.vue';
import TaskItem from '@/components/Tasks/TaskItem.vue';
import type { Task } from '@/interfaces/tasks.interfaces';

const {getTasks, changeTaskStatus} = useTaskService()
const tasks = ref<Task[]>([])
const searchQuery = ref('')
const filteredTasks = ref<Task[]>([])
const selectedStatus = ref('all')
const loading = ref(false)

const filterTasks = () => {
    filteredTasks.value = tasks.value.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || (task.description && task.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
        const matchesStatus = selectedStatus.value === 'all' || task.status === selectedStatus.value;
        return matchesSearch && matchesStatus;
    });
};

const updateTaskStatus = async (id: number, status: 'Not Started' | 'In Progress' | 'Completed') => {
    loading.value = true
    await changeTaskStatus(id, status)
    tasks.value = await getTasks()
    filterTasks()
    loading.value = false
};

watch([searchQuery, selectedStatus], ()=>{
    loading.value = true
    filterTasks()
    loading.value = false
});

onMounted(async()=>{
    loading.value = true
    tasks.value = await getTasks()
    filteredTasks.value = tasks.value
    loading.value = false
})
</script>

<template>
 <div class="flex justify-between ">
    <div class="">
        <p class="text-3xl font-bold text-zinc-600">
            Intern Dashboard
        </p>
    </div>
    <RouterLink :to="{name: 'home'}" type="button" class="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Back to Portfolio View</RouterLink>
 </div>
 <hr class="my-4 border-gray-500"/>

 <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <StatCard label="Total Tasks" :value="0"/>
    <StatCard label="Completed Tasks" :value="tasks.filter(task => task.status === 'Completed').length"/>
    <StatCard label="Pending Tasks" :value="tasks.filter(task => task.status === 'Not Started').length"/>
    <StatCard label="In Progress Tasks" :value="tasks.filter(task => task.status === 'In Progress').length"/>
</section>

<section class="mt-6 bg-white p-4 rounded-base shadow-sm">
    <div class="flex justify-between items-center mb-4 gap-2">
        <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div class="relative w-lg">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                </div>
                <input v-model="searchQuery" type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
                <button type="button" class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
            </div>

        <select v-model="selectedStatus" id="countries_disabled" class=" max-w-sm block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs">
            <option selected value="all">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>


    </div>
    <div v-if="loading" class="text-center py-10">
        <p class="text-body">Loading tasks...</p>
    </div>
    <div v-else>
        <div v-if="filteredTasks.length === 0" class="text-center text-gray-500 py-10">
            No tasks found.
        </div>
        <div v-for="task in filteredTasks" :key="task.id">
            <TaskItem :task="task" @updateStatus="updateTaskStatus"/>
        </div>
    </div>
</section>

</template>

<style scoped></style>
