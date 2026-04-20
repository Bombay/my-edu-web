<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api'

const route = useRoute()
const postId = route.params.id

const post = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    post.value = await api(`/posts/${postId}`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '알 수 없는 오류'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="error" class="text-danger">에러: {{ error }}</p>
    <article v-else-if="post" class="card">
      <h1>{{ post.title }}</h1>
      <p class="text-muted">작성자: {{ post.author }} · {{ post.created_at }}</p>
      <hr class="post-divider" />
      <p class="post-content">{{ post.content }}</p>
    </article>
  </div>
</template>

<style scoped>
.post-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-4) 0;
}
.post-content {
  white-space: pre-wrap;
}
</style>
