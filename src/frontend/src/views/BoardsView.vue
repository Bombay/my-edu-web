<script setup lang="ts">
import { ref, onMounted } from 'vue'

const boards = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/boards')
    if (!response.ok) {
      throw new Error(`서버 오류 : ${response.status}`)
    }
    const data = await response.json()
    boards.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : '알수 없는 오류'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>게시판 목록</h1>
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" style="color: red">에러가 발생했어요 : {{ error }}</p>
    <ul v-else>
      <li v-for="board in boards" :key="board.id">{{ board.name }} - {{ board.description }}</li>
    </ul>
  </div>
</template>
