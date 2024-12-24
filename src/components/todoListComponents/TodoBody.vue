<script setup>
import Header from "@/components/todoListComponents/Header.vue"
import TodoListofTasks from "@/components/todoListComponents/TodoListofTasks.vue"
import Calender from "./Calender.vue";
</script>
<template>
    <div class="h-full space-y-5 w-full flex justify-between space-x-3">
        <div class="w-3/12">.</div>
        <div class="w-5/12">
            <div>
                <Header />
            </div>
            <div>
                <TodoListofTasks />

            </div>
        </div>
        <div class="w-4/12">
            <Calender />
        </div>

    </div>
</template>