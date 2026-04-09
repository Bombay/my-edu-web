<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
// route.params.id로 URL의 :id 값을 가져옴
</script>

<template>
  <div>
    <h1>{{ route.params.id }}번 게시판</h1>
    <p>이 게시판의 글 목록이 여기에 표시됩니다. (나중에 API 연동 예정)</p>
  </div>
</template>
