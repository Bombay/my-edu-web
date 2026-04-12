<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../api'

const boards = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await api('/boards')
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
