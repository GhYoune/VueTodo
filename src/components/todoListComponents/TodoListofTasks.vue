<script setup>
import { useTaskStore } from "@/stores/taskStore.js";
import { ref, computed } from 'vue';
import { onMounted } from 'vue';

const todoStore = useTaskStore();
const newTask = ref('');
const tasks = computed(() => todoStore.allTasks);
onMounted(() => {
    todoStore.fetchTasks();
});

function addNewTask() {
    todoStore.addTask(newTask.value)
    newTask.value = '';
}
function removeTask(task) {
    todoStore.removeTask(task);
}
function completeTask(task) {
    todoStore.taskCompleted(task);
}
</script>
<template>
    <div class="w-full flex justify-center items-center py-3">
        <div class="w-full flex justify-center items-center ">
            <input v-model="newTask" type="text" placeholder="New task ?" id="task"
                class="p-2 w-3/6 rounded-md text-black font-semibold">
            <button @click="addNewTask" class="p-2 rounded-md bg-violet-600 text-white fonts w-1/12 ">Add</button>
        </div>

    </div>
    <div class="w-full py-3">
        <ul class="">

            <li v-for="task in tasks"
                class="w-3/6 text-lg font-semibold text-white bg-slate-700 px-4 py-2 rounded-md m-auto my-2 shadow-2xl hover:bg-slate-600 transition ease-in-out duration-300 cursor-pointer hover:scale-105">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3 justify-center">
                        <div class="w-7 h-7 border-2 border-blue-500 rounded-full" @click="completeTask(task)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-6 bg-green-600 rounded-full" v-show="task.completed">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div>
                            <span class="text-slate-400">{{ task.createdAt }}</span>
                            <br>
                            <span class="text-white font-semibold">{{ task.text }}</span>
                        </div>
                    </div>
                    <button @click="removeTask(task)"
                        class="p-2 rounded-full hover:bg-red-600 transition ease-in-out duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-trash">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </button>
                </div>


            </li>
        </ul>
    </div>
</template>