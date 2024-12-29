<script setup>
import { useTaskStore } from '@/stores/taskStore';
import { computed } from 'vue';
const taskStore = useTaskStore();
const taskByCatigoriy = computed(() => {
    const counts = {};
    taskStore.catOptions.forEach(option => {
        counts[option.value] = 0;
    });
    taskStore.allTasks.forEach(task => {
        if (task.category && counts.hasOwnProperty(task.category)) {
            counts[task.category]++;
        }
    });
    return counts;
})
const taskByPriority = computed(() => {
    const counts = {};
    taskStore.priOptions.forEach(option => {
        counts[option.value] = 0;
    });
    taskStore.allTasks.forEach(task => {
        if (task.priority && counts.hasOwnProperty(task.priority)) {
            counts[task.priority]++;
        }
    });
    return counts;
})
</script>
<template>
    <div class="h-full bg-gray-800">
        <div class="h-1/12 flex items-center justify-start space-x-3  rounded-r-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-calendar-check w-8 h-8 text-cyan-500 m-3">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
            </svg>
            <p class="text-lg font-extrabold text-white ">Todo List</p>
        </div>
        <div class="h-8/12">
            <div class="p-4 font-bold text-lg underline ">Catigories :</div>
            <div>
                <ul class="p-2 space-y-4">
                    <li v-for="option in taskStore.catOptions"
                        class="text-sm font-semibold text-white bg-slate-700 px-3 py-3 rounded-md m-auto my-3 shadow-2xl hover:bg-slate-600 transition ease-in-out duration-300 cursor-pointer ">
                        <div class="flex justify-between"><span> {{ option.label }}</span> <span class="text-md ">({{
                            taskByCatigoriy[option.value]
                                }})
                            </span></div>
                    </li>
                </ul>
            </div>
            <div class="p-4 font-bold text-lg underline ">Priorities :</div>
            <div>
                <ul class="p-2 space-y-4">
                    <li v-for="option in taskStore.priOptions"
                        class="text-sm font-semibold text-white bg-slate-700 px-3 py-3 rounded-md m-auto my-3 shadow-2xl hover:bg-slate-600 transition ease-in-out duration-300 cursor-pointer ">
                        <div class="flex justify-between"><span> {{ option.label }}</span> <span class="text-md ">({{
                            taskByPriority[option.value]
                                }})
                            </span></div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>