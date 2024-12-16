import { defineStore } from 'pinia'
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  }),

  actions: {
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask(task) {
      const newTask = {
        text: task,
        completed: false,
        createdAt: new Date().toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
      }
      this.tasks.push(newTask)
      this.saveTasks()
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task)
      if (index !== -1) {
        this.tasks.splice(index, 1)
        this.saveTasks()
      }
    },
    taskCompleted(task) {
      const index = this.tasks.indexOf(task)
      if (index !== -1) {
        this.tasks[index].completed = !this.tasks[index].completed
        this.saveTasks()
      }
    },
  },

  getters: {
    allTasks: (state) => state.tasks,
    tasksCount: (state) => state.tasks.length,
  },
})
