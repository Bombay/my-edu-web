<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = null

  try {
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    authStore.login(data.token, data.user)

    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : '로그인 실패'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>로그인</h1>

    <form @submit.prevent="handleLogin" class="card">
      <label>이메일</label>
      <input v-model="email" type="email" class="input" placeholder="example@email.com" />

      <label>비밀번호</label>
      <input v-model="password" type="password" class="input" placeholder="6자 이상 입력" />

      <p v-if="error" class="text-danger">{{ error }}</p>

      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? '로그인 중...' : '로그인' }}
      </button>
    </form>
  </div>
</template>
