<template>
  <div class="container">
    <h1>게시판 상세</h1>
    <div class="button-container">
      <RouterLink :to="'/board/update/' + store.board.id">
        <button class="update-button" v-if="loginUser && store.board.userId === loginUser.id">수정</button>
      </RouterLink>
      <button class="delete-button" @click="deleteBoard" v-if="loginUser && store.board.userId === loginUser.id">
        삭제
      </button>
    </div>
    <div class="board-content">
      <div class="board-header">
        <div class="board-item-title">
          <h2>{{ store.board.title }}</h2>
        </div>
        <div class="board-meta">
          <div class="board-item-writer">
            <span>작성자: {{ store.board.writer }}</span>
          </div>
          <div class="board-item-regist-date">
            <span>작성일: {{ store.board.registDate }}</span>
          </div>
          <div class="board-item-view-cnt">
            <span>조회수: {{ store.board.viewCount }}</span>
          </div>
        </div>
      </div>
      <div class="board-item-content">
        <p>{{ store.board.content }}</p>
      </div>
    </div>
    <hr>
    <CommentView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { onMounted } from 'vue';
import CommentView from '../comment-reply/CommentView.vue';

const route = useRoute();
const store = useBoardStore();

const loginUser = JSON.parse(sessionStorage.getItem('user'));

const deleteBoard = () => {
  store.deleteBoard(route.params.id);
}

onMounted(() => {
  store.getBoard(route.params.id);
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
  margin-bottom: 20px;
  color: #333;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.update-button,
.delete-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.update-button {
  background-color: #4caf50;
  color: white;
}

.update-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

.board-content {
  text-align: left;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-header {
  margin-bottom: 20px;
}

.board-item-title h2 {
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
}

.board-meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.board-item-writer,
.board-item-regist-date,
.board-item-view-cnt {
  font-size: 0.9em;
  color: #666;
}

.board-item-content p {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
