<script setup lang="ts" >
import type { Task } from '@/interfaces/tasks.interfaces';
import { computed, type PropType } from 'vue';

const props = defineProps({
    task: {type: Object as PropType<Task>, required: true}
});

const emit = defineEmits(['updateStatus']);


const statusClasses = {
    'Completed': 'px-3 py-1 text-sm font-medium text-green-800 bg-green-200 rounded-full',
    'In Progress': 'px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-200 rounded-full',
    'Not Started': 'px-3 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded-full'
};

const getStatusClass = computed(() => {
    return statusClasses[props.task.status];
});

const formattedDate = computed(() => {
    const date = new Date(props.task.updated_at);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
});
</script>
<template>

<div href="#" class="flex justify-between bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium items-start my-2">
    <div>
        <p class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{{ props.task.title }}</p>
        <p class="text-body">{{ props.task.description }}</p>
        <p class="mt-4 text-sm text-gray-500">Task Id: {{ props.task.id }}</p>
        <p class="mt-4 text-sm text-gray-500">Updated At: {{ formattedDate }}</p>
    </div>
    <div class="flex flex-col justify-between items-end gap-10">
        <span :class="getStatusClass">{{ props.task.status }}</span>
        <div class="flex gap-2">
            <button @click="emit('updateStatus', props.task.id, 'In Progress' )" v-if="props.task.status == 'Not Started'" type="button" class="text-white bg-yellow-500 box-border border border-transparent hover:bg-yellow-700 focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Mark as In Progress</button>
            <button @click="emit('updateStatus', props.task.id, 'Completed')" v-else-if="props.task.status != 'Completed'" type="button" class="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Mark as Completed</button>
        </div>
    </div>
</div>

</template>