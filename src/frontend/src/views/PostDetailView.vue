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
    <p v-else-if="error" style="color: red">에러: {{ error }}</p>
    <article v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>
        <small>작성자: {{ post.author }} · {{ post.created_at }}</small>
      </p>
      <hr />
      <p style="white-space: pre-wrap">{{ post.content }}</p>
    </article>
  </div>
</template>
