<template>
    <div>
      <h1>게시글 작성</h1>
      <div class="board-create">
        <div class="board-item">
          <label>제목:</label>
          <input type="text" v-model="board.title" placeholder="제목을 입력하세요">
        </div>
        <div class="board-item">
          <label>작성자:</label>
          <input type="text" :value="user.nickname" readonly>
        </div>
        <div class="board-item-content">
          <label>내용:</label>
          <textarea v-model="board.content" placeholder="내용을 입력하세요"></textarea>
        </div>
        <button @click="Submit">등록</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useBoardStore } from '@/stores/board';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const store = useBoardStore();
  const user = ref(JSON.parse(sessionStorage.getItem('user')));
  const worldcupId = route.params.worldcupId;
  
  const board = ref({
    title: '',
    content: '',
  });


  
  const Submit = () => {
    store.createBoard(worldcupId, board.value);
  }
  </script>
  
  <style scoped>
  body {
    background-color: #f5f5f5;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-top: 20px;
    color: #333;
    font-size: 2em;
  }
  
  .board-create {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .board-item, .board-item-content {
    margin-bottom: 20px;
  }
  
  .board-item label, .board-item-content label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    color: #555;
  }
  
  .board-item input, .board-item-content textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .board-item input[readonly] {
    background-color: #e9e9e9;
    cursor: not-allowed;
  }
  
  .board-item-content textarea {
    resize: vertical;
    height: 200px;
  }
  
  button {
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  