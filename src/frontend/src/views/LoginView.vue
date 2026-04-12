<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()

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
    console.log(data)
    alert('로그인 성공 @ 홈으로 이동합니다.')
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

    <form @submit.prevent="handleLogin">
      <div>
        <label>이메일</label>
        <input v-model="email" type="email" placeholder="example@email.com" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="6자 이상입력" />
      </div>

      <p v-if="error" style="color: red">{{ error }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? '로그인 중...' : '로그인' }}
      </button>
    </form>
  </div>
</template>
