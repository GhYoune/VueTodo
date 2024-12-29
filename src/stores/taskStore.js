import { defineStore } from 'pinia'
import db from '@/firebaseinit.js'
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { reactive } from 'vue'
const taskCollection = collection(db, 'tasks')
export const useTaskStore = defineStore('task', {
  state: () =>
    reactive({
      // tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      tasks: [],
      priOptions: [
        { value: 'High', label: 'High 🔥' },
        { value: 'Medium', label: 'Medium ⚡' },
        { value: 'Low', label: 'Low 🌳' },
      ],
      catOptions: [
        { value: 'Health', label: 'Health 🍀' },
        { value: 'Work', label: 'Work 👨🏻‍💼' },
        { value: 'To Buy', label: 'To Buy 🏬' },
        { value: 'Familly', label: 'Familly and Friends 🙋🏻‍♂️🙋🏻‍♀️' },
      ],
    }),
  //FIRESTORE ACTIONS
  actions: {
    fetchTasks() {
      onSnapshot(taskCollection, (snapshot) => {
        this.tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      })
    },
    async addTask(task) {
      if (!task.title.trim()) return

      const newTask = {
        title: task.title,
        completed: false,
        priority: task.priority,
        category: task.category,
        createdAt: new Date().toLocaleString(),
      }

      await addDoc(taskCollection, newTask)
    },
    async removeTask(task) {
      const docRef = doc(db, 'tasks', task.id)
      await deleteDoc(docRef)
    },

    // Toggle task completion
    async taskCompleted(task) {
      const docRef = doc(db, 'tasks', task.id)
      await updateDoc(docRef, { completed: !task.completed })
    },
  },

  //LOCAL STORAGE ACTIONS
  // actions: {
  //   saveTasks() {
  //     localStorage.setItem('tasks', JSON.stringify(this.tasks))
  //   },
  //   addTask(task) {
  //     const newTask = {
  //       text: task,
  //       completed: false,
  //       createdAt: new Date().toLocaleString('en-US', {
  //         weekday: 'long',
  //         month: 'long',
  //         day: 'numeric',
  //       }),
  //     }
  //     this.tasks.push(newTask)
  //     this.saveTasks()
  //   },
  //   removeTask(task) {
  //     const index = this.tasks.indexOf(task)
  //     if (index !== -1) {
  //       this.tasks.splice(index, 1)
  //       this.saveTasks()
  //     }
  //   },
  //   taskCompleted(task) {
  //     const index = this.tasks.indexOf(task)
  //     if (index !== -1) {
  //       this.tasks[index].completed = !this.tasks[index].completed
  //       this.saveTasks()
  //     }
  //   },
  // },

  getters: {
    allTasks: (state) => state.tasks,
    tasksCount: (state) => state.tasks.length,
    tasksByCatigories : (state)=>state
  },
})
