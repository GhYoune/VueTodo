<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useTaskStore } from '@/stores/taskStore';
import { computed, onMounted } from 'vue';
const taskStore = useTaskStore()
onMounted(() => {
    taskStore.fetchTasks();
});

const events = computed(() => {
    return taskStore.tasks.map(task => ({
        start: task.createdAt,
        end: task.createdAt,
        title: task.title,
        class: 'sport',
        content: task.completed ? '✔ Completed' : '⚠ Pending',
        allDay: true
    }))
})


</script>

<template>
    <div class="bg-gray-800 p-3 rounded-xl mx-2 text-white">
        <vue-cal style="height: 380px;" :time="false" active-view="month" hide-view-selector xsmall today-button
            :disable-views="['years', 'year', 'week']" class="bg-gray-800 rounded-lg shadow-md p-1" :events="events">
        </vue-cal>
    </div>
</template>

<style>
.sport {
    background-color: rgba(6, 182, 212, 0.9);
    border: 1px solid rgb(8, 145, 178);
    color: #fff;
    cursor: pointer;
    padding: 0.3rem;
    margin: 4px 0 8px;

}
</style>