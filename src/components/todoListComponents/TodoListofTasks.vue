<script setup>
import { useTaskStore } from "@/stores/taskStore.js";
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { vAutoAnimate } from "@formkit/auto-animate";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,

} from '@headlessui/vue'
import { useAlert } from '@/composables/useAlert.js';
const todoStore = useTaskStore();
const newTask = ref({ title: '', priority: '', category: '' });
const { alert } = useAlert();

const prioCheck = {
    "High": '🔥',
    "Medium": '⚡',
    "Low": '🌳',
}
const catCheck = {
    "Health": '🍀',
    "Work": '👨🏻‍💼',
    "To Buy": '🏬',
    "Familly": '🙋🏻‍♂️🙋🏻‍♀️',
}
const tasks = computed(() => todoStore.allTasks);
onMounted(() => {
    todoStore.fetchTasks();

});

function addNewTask() {
    if (!newTask.value.title.trim() || !newTask.value.category.trim()) return;
    try {
        todoStore.addTask(newTask.value)
        newTask.value = { title: '', priority: '', category: '' };
        alert('Task added successfully')

    }
    catch {
        alert('Somthing went wrong', 'error')


    }

}

function removeTask(task) {
    todoStore.removeTask(task);
    alert('Task Removed successfully')

}
function completeTask(task) {
    todoStore.taskCompleted(task);
    alert('Task Completed successfully')

}

</script>
<template>
    <div class="flex space-x-4  p-4 bg-slate-800 w-full rounded-xl shadow-lg">
        <input required name="title" id="title" type="text" validation="required|max:180" v-model="newTask.title"
            placeholder="New task ?" help="Your task headline" class="p-2 w-4/5 rounded-md text-black font-semibold" />
        <Listbox name="priority" id="priority" class="text-black font-semibold relative" v-model="newTask.priority"
            as="div" v-auto-animate>
            <ListboxButton class="py-2 pl-3 pr-11 text-left bg-white rounded-md shadow-md">
                {{ newTask.priority || 'Priority' }}
            </ListboxButton>
            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg" v-auto-animate>
                    <ListboxOption v-for="option in todoStore.priOptions" :key="option.value" :value="option.value"
                        class="cursor-pointer select-none p-2 hover:bg-gray-100">
                        {{ option.label }}
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </Listbox>
        <Listbox name=" category" id=" category" class="text-black font-semibold relative" v-model="newTask.category"
            as="div" v-auto-animate>
            <ListboxButton class="py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-md">
                {{ newTask.category || ' category' }}
            </ListboxButton>
            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg" v-auto-animate>
                    <ListboxOption v-for="option in todoStore.catOptions" :key="option.value" :value="option.value"
                        class="cursor-pointer select-none p-2 hover:bg-gray-100"> {{ option.label }}
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </Listbox>
        <button @click="addNewTask"
            class="p-2 rounded-md bg-violet-600 text-white fonts w-1/12 flex items-center justify-center"><svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-circle-plus">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
            </svg>
        </button>


    </div>

    <div class="p-3 bg-slate-800 w-full rounded-2xl shadow-lg my-4 ">
        <div v-if="!tasks || tasks.length === 0" class="w-full">
            <div class="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-shield-question opacity-50">
                    <path
                        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                </svg>
            </div>
            <div class=" flex justify-center items-center p-2">
                <span class="text-base font-semibold">Today seems empty</span>
            </div>
        </div>
        <ul class="max-h-[370px] overflow-y-auto custom-scrollbar" v-auto-animate>
            <li v-for="task in todoStore.filtredTasks" :key="task.id"
                class="text-sm font-semibold text-white bg-slate-700 px-3 py-3 rounded-md m-auto my-3 shadow-2xl hover:bg-slate-600 transition ease-in-out duration-300 cursor-pointer ">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3 justify-center">
                        <div class="w-7 h-7 border-2 border-cyan-500 rounded-full" @click="completeTask(task)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-6 bg-emerald-600 rounded-full"
                                v-show="task.completed">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div>
                            <span class="text-slate-400">{{ task.createdAt }}</span>
                            <br>
                            <span class="text-white font-semibold"
                                :class="{ 'line-through opacity-35': task.completed }">{{
                                    task.title }} <span v-if="prioCheck[task.priority]">{{ prioCheck[task.priority]
                                    }}</span> <span v-if="catCheck[task.category]">{{ catCheck[task.category]
                                    }}</span></span>

                        </div>
                    </div>
                    <div class=" flex items-center space-x-3">
                        <span class=" rounded-xl p-2 text-xs "
                            :class="{ 'bg-red-500 text-white': task.priority === 'High', 'bg-green-500 text-white': task.priority === 'Low', 'bg-yellow-600 text-white': task.priority === 'Medium' }">{{
                                task.priority }}</span>
                        <button @click="removeTask(task)"
                            class="p-2 rounded-full hover:bg-red-600 transition ease-in-out duration-300 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-trash">
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>