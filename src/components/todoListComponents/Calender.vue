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
const onCellClick = (event) => {
    const clickedDate = new Date(event);
    const year = clickedDate.getFullYear();
    const month = String(clickedDate.getMonth() + 1).padStart(2, '0');
    const day = String(clickedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log('Cell clicked:', event, formattedDate);
    taskStore.setSelectedDay(formattedDate)
};

</script>

<template>
    <div class="bg-gray-800 p-3 rounded-xl mx-2 text-white">
        <vue-cal style="height: 380px;" :time="false" active-view="month" hide-view-selector xsmall today-button
            :disable-views="['years', 'year', 'week']" class="bg-gray-800 rounded-lg shadow-md p-1" :events="events"
            @cell-click="onCellClick">
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