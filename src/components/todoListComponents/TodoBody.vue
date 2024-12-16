<script setup>
import Header from "@/components/todoListComponents/Header.vue"
import TodoListofTasks from "@/components/todoListComponents/TodoListofTasks.vue"
</script>
<template>
    <div class="h-full space-y-5">
        <div class="h-2/6">
            <Header />
        </div>
        <div class="h-4/6">
            <TodoListofTasks />
        </div>

    </div>
</template>