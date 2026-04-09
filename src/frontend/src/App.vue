<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/boards">게시판</RouterLink>
      <RouterLink to="/login">로그인</RouterLink>
      <RouterLink to="/register">회원가입</RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #1e293b;
}
nav a {
  color: #e2e8f0;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
nav a:hover {
  background: #334155;
}
nav a.router-link-active {
  background: #3b82f6;
  color: white;
}
main {
  padding: 2rem;
}
</style>
