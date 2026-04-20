<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { api } from '../api'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const boardId = route.params.id // URL의 :id 값

const posts = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newTitle = ref('')
const newContent = ref('')
const createError = ref<string | null>(null)
const creating = ref(false)

onMounted(async () => {
  try {
    const data = await api(`/posts?boardId=${boardId}`)
    posts.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : '알 수 없는 오류'
  } finally {
    loading.value = false
  }
})

async function handleCreate() {
  creating.value = true
  createError.value = null

  try {
    const newPost = await api('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: newTitle.value,
        content: newContent.value,
        board_id: Number(boardId),
      }),
    })
    posts.value.unshift(newPost) // 최신 글이 위로 오게 unshift
    newTitle.value = ''
    newContent.value = ''
  } catch (err) {
    createError.value = err instanceof Error ? err.message : '작성 실패'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <div>
    <h1>{{ boardId }}번 게시판</h1>

    <!-- 글쓰기 폼 (로그인 시에만) -->
    <section v-if="authStore.isLoggedIn" class="card">
      <h2>새 글 작성</h2>
      <form @submit.prevent="handleCreate">
        <input v-model="newTitle" class="input" placeholder="제목" required />
        <textarea
          v-model="newContent"
          class="textarea"
          placeholder="내용을 입력하세요"
          required
        ></textarea>
        <p v-if="createError" class="text-danger">{{ createError }}</p>
        <button type="submit" class="btn" :disabled="creating">
          {{ creating ? '작성 중...' : '작성' }}
        </button>
      </form>
    </section>

    <!-- 글 목록 -->
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" class="text-danger">에러: {{ error }}</p>
    <p v-else-if="posts.length === 0" class="text-muted">
      아직 글이 없습니다. 첫 글을 작성해보세요!
    </p>
    <ul v-else class="list card">
      <li v-for="post in posts" :key="post.id">
        <RouterLink :to="`/posts/${post.id}`">{{ post.title }}</RouterLink>
        <span class="text-muted"> — {{ post.author }}</span>
      </li>
    </ul>
  </div>
</template>
