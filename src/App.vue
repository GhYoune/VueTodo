<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TodoBody from '@/components/todoListComponents/TodoBody.vue'

</script>

<template>
  <div class="w-full h-full">
    <div class="">
      <TodoBody />
    </div>
  </div>
</template>
