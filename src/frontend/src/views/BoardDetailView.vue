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
    <section
      v-if="authStore.isLoggedIn"
      style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ccc; border-radius: 8px"
    >
      <h2>새 글 작성</h2>
      <form @submit.prevent="handleCreate">
        <div>
          <input v-model="newTitle" placeholder="제목" required />
        </div>
        <div>
          <textarea
            v-model="newContent"
            placeholder="내용을 입력하세요"
            rows="5"
            required
            style="width: 100%"
          ></textarea>
        </div>
        <p v-if="createError" style="color: red">{{ createError }}</p>
        <button type="submit" :disabled="creating">
          {{ creating ? '작성 중...' : '작성' }}
        </button>
      </form>
    </section>

    <!-- 글 목록 -->
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" style="color: red">에러: {{ error }}</p>
    <p v-else-if="posts.length === 0">아직 글이 없습니다. 첫 글을 작성해보세요!</p>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <RouterLink :to="`/posts/${post.id}`">
          {{ post.title }}
        </RouterLink>
        <small> — {{ post.author }}</small>
      </li>
    </ul>
  </div>
</template>
