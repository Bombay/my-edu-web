import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<any>(null)

  const isLoggedIn = computed(() => !!token.value)

  function login(newToken: string, newUser: any) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function loadFromStorage() {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      token.value = savedToken
      user.value = savedUser ? JSON.parse(savedUser) : null
    }
  }

  return { token, user, isLoggedIn, login, logout, loadFromStorage }
})
