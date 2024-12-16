<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from "@/stores/taskStore.js";

const todoStore = useTaskStore();
const currentDate = new Date()
const weekday = currentDate.toLocaleDateString("en-US", { weekday: 'long' })
const month = currentDate.toLocaleDateString("en-US", { month: 'long' })
const day = currentDate.toLocaleString("en-US", { day: 'numeric' })

</script>


<template>
    <div class="w-full flex justify-center items-center">
        <div class="flex justify-between items-center w-5/12 space-x-2">

            <div
                class="bg-gray-900 text-center rounded-lg p-3 shadow-2xl hover:scale-110 transition duration-200 ease-in-out">
                <span class=" font-semibold text-base text-white">{{ weekday }}</span>,
                <p class=" text-5xl font-extrabold text-white">{{ day }}</p>
                <span class="text-white">{{ month }}</span>

            </div>
            <div>
                <h1 class="font-bold text-3xl text-slate-100 text-center w-full ">
                    Todo List
                </h1>
                <h3 class="text-center text-lg">What do we have to accomplish today ?</h3>
            </div>
            <div
                class="bg-gray-900 text-center rounded-lg p-3 shadow-2xl hover:scale-110 transition duration-200 ease-in-out font-bold text-xl text-white ">
                Tasks
                <br> {{ todoStore.tasksCount }}
            </div>
        </div>
    </div>
</template>