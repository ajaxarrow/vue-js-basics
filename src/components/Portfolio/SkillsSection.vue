<script setup lang="ts">
import type { Skills } from '@/interfaces/portfolio.interfaces';

const skills: Skills[] = [
    { name: 'Vue.js', percentage_level: 90 },
    { name: 'TypeScript', percentage_level: 85 },
    { name: 'Tailwind CSS', percentage_level: 80 }, 
    { name: 'JavaScript', percentage_level: 95 }
];
</script>
<template>
<div class="bg-neutral-primary-soft block w-full p-6 border border-default rounded-base shadow-xs" id="skills">
        <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-heading">Technical Skills</h5>
        </a>
        
        <div class="mt-4 space-y-4">
            <div v-for="skill in skills" :key="skill.name">
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium text-gray-700">{{ skill.name }}</span>
                    <span class="text-sm font-medium text-gray-700">{{ skill.percentage_level }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                    <div class="bg-indigo-600 h-4 rounded-full" :style="{ width: skill.percentage_level + '%' }"></div>
                </div>
            </div>
            
        </div>

    </div>    
</template>