<template>
    <div class="container">
      <h1>게시판 상세</h1>
      <div class="board-content">
        <div class="board-item">
          <label>ID:</label>
          <span>{{ store.board.id }}</span>
        </div>
        <div class="board-item">
          <label>제목:</label>
          <span>{{ store.board.title }}</span>
        </div>
        <div class="board-item">
          <label>작성자:</label>
          <span>{{ store.board.writer }}</span>
        </div>
        <div class="board-item">
          <label>작성일:</label>
          <span>{{ store.board.registDate }}</span>
        </div>
        <div class="board-item">
          <label>조회수:</label>
          <span>{{ store.board.viewCount }}</span>
        </div>
        <div class="board-item-content">
          <label>내용:</label>
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
  import CommentView from '../comment/CommentView.vue';
  
  const route = useRoute();
  const store = useBoardStore();
  
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
  
  .board-content {
    text-align: left;
    margin-bottom: 20px;
  }
  
  .board-item {
    margin-bottom: 10px;
  }
  
  .board-item label {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .board-item-content label {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }
  
  .board-item-content p {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
  