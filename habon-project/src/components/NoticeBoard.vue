<template>
  <div class="container">
    <h1>게시판</h1>
    <p>여러분의 토론주제를 펼쳐보세요!</p>
    <!-- <button class="create-button" @click="">글쓰기</button> -->
    <RouterLink :to="'/board/create/' + route.params.id">
      <button class="create-button" v-if="loginUser">글쓰기</button>
    </RouterLink>
    <hr>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!boardList">
          <td colspan="5">데이터를 불러오는 중입니다...</td>
        </tr>
        <tr v-else-if="boardList.length === 0">
          <td colspan="5">게시글이 아직 없습니다!</td>
        </tr>
        <tr v-else v-for="board in boardList" :key="board.id">
          <td>{{ board.id }}</td>
          <td>
            <RouterLink class="board" :to="{ path: '/board/' + board.id }">{{ board.title }}</RouterLink>
          </td>
          <td>{{ board.writer }}</td>
          <td>{{ board.registDate }}</td>
          <td>{{ board.viewCount }}</td>
          <td>{{ board.likeCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useNoticeBoardStore } from '@/stores/noticeBoard';
import { useRoute } from 'vue-router';


const store = useNoticeBoardStore();

const route = useRoute();

const boardList = computed(() => store.boardList);

const loginUser = ref(JSON.parse(sessionStorage.getItem('user')));

onMounted(() => {
  store.getBoardList();
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

.create-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1em;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f9f9f9;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.board {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.board:hover {
  color: #2980b9;
}
</style>