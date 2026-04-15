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
    <section
      v-if="authStore.isLoggedIn"
      style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ccc; border-radius: 8px"
    >
      <h2>새 게시판 만들기</h2>
      <form @submit.prevent="handleCreate">
        <div>
          <input v-model="newName" placeholder="게시판 이름" required />
        </div>
        <div>
          <input v-model="newDescription" placeholder="설명 (선택)" />
        </div>
        <p v-if="createError" style="color: red">{{ createError }}</p>
        <button type="submit" :disabled="creating">
          {{ creating ? '만드는 중...' : '만들기' }}
        </button>
      </form>
    </section>

    <!-- 게시판 목록 -->
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" style="color: red">에러: {{ error }}</p>
    <ul v-else>
      <li v-for="board in boards" :key="board.id">
        <RouterLink :to="`/boards/${board.id}`">
          {{ board.name }}
        </RouterLink>
        - {{ board.description }}
      </li>
    </ul>
  </div>
</template>
