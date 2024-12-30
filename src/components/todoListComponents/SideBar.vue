<script setup>
import { useTaskStore } from '@/stores/taskStore';
import { computed } from 'vue';
import { ref } from 'vue';
import { vAutoAnimate } from "@formkit/auto-animate";
const taskStore = useTaskStore();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
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
    <div class="relative w-full" v-auto-animate>
        <div :class="[
            'h-full bg-gray-800 fixed top-0 left-0 transform transition-transform duration-300 ease-in-out',
            { '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }
        ]">
            <div class="h-1/12 flex items-center justify-between space-x-3 rounded-r-lg">
                <div class="flex justify-center items-center">
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
                <button class="p-2 hover:bg-gray-600 rounded-lg transition ease-in-out duration-300"
                    @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-left-from-line">
                        <path d="m9 6-6 6 6 6" />
                        <path d="M3 12h14" />
                        <path d="M21 19V5" />
                    </svg>
                </button>
            </div>
            <div class="h-full overflow-y-scroll custom-scrollbar">
                <div class="p-4 font-bold text-lg underline ">Catigories :</div>
                <div>
                    <ul class="p-2 space-y-4">
                        <li v-for="option in taskStore.catOptions"
                            class="text-sm font-semibold text-white bg-slate-700 px-3 py-3 rounded-md m-auto my-3 shadow-2xl hover:bg-slate-600 transition ease-in-out duration-300 cursor-pointer ">
                            <div class="flex justify-between"><span> {{ option.label }}</span> <span
                                    class="text-md ">({{
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
                            <div class="flex justify-between"><span> {{ option.label }}</span> <span
                                    class="text-md ">({{
                                        taskByPriority[option.value]
                                    }})
                                </span></div>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ml-0 transition-all duration-300 ease-in-out" :class="{ 'ml-64': isSidebarOpen }">
            <button @click="toggleSidebar" class="p-2 hover:bg-gray-600 rounded-lg transition ease-in-out duration-300"
                :class="{ 'hidden': isSidebarOpen }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-arrow-right-from-line">
                    <path d="M3 5v14" />
                    <path d="M21 12H7" />
                    <path d="m15 18 6-6-6-6" />
                </svg> </button>

        </div>
    </div>
</template>