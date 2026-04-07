<script setup lang="ts">
  import { ref } from 'vue'

  const isLoggedIn = ref(false)
  const newTodo = ref('')
  const todos = ref<string[]>([])

  function addTodo() {
    if (!newTodo.value.trim()) return
    todos.value.push(newTodo.value)
    newTodo.value = ''
  }

  function removeTodo(index: number) {
    todos.value.splice(index, 1)
  }
  </script>

  <template>
    <div>
      <h1>Vue.js 핵심 기능</h1>

      <!-- v-if: 조건부 렌더링 -->
      <button @click="isLoggedIn = !isLoggedIn">
        {{ isLoggedIn ? '로그아웃' : '로그인' }}
      </button>

      <p v-if="isLoggedIn" style="color: green;">로그인 상태입니다</p>
      <p v-else style="color: red;">로그아웃 상태입니다</p>

      <!-- v-for: 리스트 렌더링 (로그인 시에만 보임) -->
      <div v-if="isLoggedIn" style="margin-top: 1rem;">
        <h2>할 일 목록</h2>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="할 일 입력 후 Enter" />
        <button @click="addTodo">추가</button>

        <p v-if="todos.length === 0">아직 할 일이 없습니다.</p>
        <ul>
          <li v-for="(todo, index) in todos" :key="index">
            {{ todo }}
            <button @click="removeTodo(index)">삭제</button>
          </li>
        </ul>
      </div>
    </div>
  </template>

  <style scoped>
  button { font-size: 1rem; padding: 0.3rem 0.8rem; margin: 0.2rem; cursor: pointer; }
  input { font-size: 1rem; padding: 0.3rem; }
  li { margin: 0.3rem 0; }
  </style>