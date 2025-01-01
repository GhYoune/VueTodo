<script setup>
import Header from "@/components/todoListComponents/Header.vue"
import TodoListofTasks from "@/components/todoListComponents/TodoListofTasks.vue"
import Calender from "./Calender.vue";
import SideBar from "./SideBar.vue";
</script>
<template>
    <div class="h-full space-y-5 w-full flex justify-between space-x-5 font-mono">
        <div class="w-3/12">
            <SideBar />
        </div>
        <div class="w-6/12">
            <div>
                <Header />
            </div>
            <div class="">
                <TodoListofTasks />

            </div>
        </div>
        <div class="w-3/12 h-3/4 ">
            <!-- <Calender /> -->
            <Calender />
        </div>

    </div>
</template>