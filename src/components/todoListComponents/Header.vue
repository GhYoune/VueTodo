<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from "@/stores/taskStore.js";

const todoStore = useTaskStore();
const currentDate = new Date()
const weekday = currentDate.toLocaleDateString("en-US", { weekday: 'long' })
const month = currentDate.toLocaleDateString("en-US", { month: 'long' })
const day = currentDate.toLocaleString("en-US", { day: 'numeric' })
const currentHour = currentDate.getHours();
const greetings = computed(() => {
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning !";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon !";
    } else if (currentHour >= 18 && currentHour < 22) {
        return "Good Evening !";
    } else {
        return "Night Night !";
    }
});
</script>


<template>
    <div class="w-full flex justify-between items-center">
        <div class=" w-full items-center space-x-5  space-y-3">

            <div
                class="bg-cyan-500 text-center rounded-lg p-2 shadow-2xl hover:scale-105 transition duration-200 ease-in-out">
                <span class=" font-semibold text-base text-white">{{ weekday }}</span>,
                <p class=" text-5xl font-extrabold text-white">{{ day }}</p>
                <span class="text-white">{{ month }}</span>

            </div>
            <div class="space-y-2 pb-4">
                <h1 class="text-center font-bold text-2xl text-slate-100  w-full">
                    {{ greetings }}
                </h1>
                <h3 class="text-center text-lg font-bold ">What do we have to accomplish today ?</h3>
            </div>
            <!-- <div
                class="bg-gray-900 text-center rounded-lg p-3 shadow-2xl hover:scale-110 transition duration-200 ease-in-out font-bold text-xl text-white ">
                Tasks
                <br> {{ todoStore.tasksCount }}
            </div> -->
        </div>
    </div>
</template>