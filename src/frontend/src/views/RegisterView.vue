<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()

const email = ref('')
const nickname = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleRegister() {
  loading.value = true
  error.value = null

  try {
    await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      }),
    })
    alert('회원가입 성공 @ 로그인 페이지로 이동합니다.')
    router.push('/login')
  } catch (err) {
    error.value = err instanceof Error ? err.message : '회원가입 실패'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>회원가입</h1>

    <form @submit.prevent="handleRegister">
      <div>
        <label>이메일</label>
        <input v-model="email" type="email" placeholder="example@email.com" />
      </div>

      <div>
        <label>닉네임</label>
        <input v-model="nickname" type="text" placeholder="닉네임 입력" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="6자 이상입력" />
      </div>

      <p v-if="error" style="color: red">{{ error }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? '가입 중...' : '회원가입' }}
      </button>
    </form>
  </div>
</template>
