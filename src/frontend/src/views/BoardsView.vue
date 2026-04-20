<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { api } from '../api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const boards = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newName = ref('')
const newDescription = ref('')
const createError = ref<string | null>(null)
const creating = ref(false)

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

async function handleCreate() {
  creating.value = true
  createError.value = null

  try {
    const newBoard = await api('/boards', {
      method: 'POST',
      body: JSON.stringify({
        name: newName.value,
        description: newDescription.value,
      }),
    })
    boards.value.push(newBoard)
    newName.value = ''
    newDescription.value = ''
  } catch (err) {
    createError.value = err instanceof Error ? err.message : '생성 실패'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <div>
    <h1>게시판 목록</h1>

    <!-- 새 게시판 생성 폼 (로그인 시에만) -->
    <section v-if="authStore.isLoggedIn" class="card">
      <h2>새 게시판 만들기</h2>
      <form @submit.prevent="handleCreate">
        <input v-model="newName" class="input" placeholder="게시판 이름" required />
        <input v-model="newDescription" class="input" placeholder="설명 (선택)" />
        <p v-if="createError" class="text-danger">{{ createError }}</p>
        <button type="submit" class="btn" :disabled="creating">
          {{ creating ? '만드는 중...' : '만들기' }}
        </button>
      </form>
    </section>

    <!-- 게시판 목록 -->
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" class="text-danger">에러: {{ error }}</p>
    <ul v-else class="list card">
      <li v-for="board in boards" :key="board.id">
        <RouterLink :to="`/boards/${board.id}`">
          {{ board.name }}
        </RouterLink>
        <span class="text-muted"> — {{ board.description }}</span>
      </li>
    </ul>
  </div>
</template>
