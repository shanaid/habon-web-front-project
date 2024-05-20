<template>
    <div class="container">
      <h1>스포츠 이상형 월드컵</h1>
      <p>진행하고자 하는 월드컵을 선택하세요!</p>
  
      <div class="worldcup-list">
        <div v-for="worldcup in store.worldcupList" :key="worldcup.id" class="worldcup-item">
          <RouterLink :to="'/worldcup/' + worldcup.id">
            <div class="world-cup-box">{{ worldcup.id }}</div>
          </RouterLink>
          <RouterLink :to="'/noticeBoard/' + worldcup.id">
            <div class="board-box">게시판</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted } from 'vue';
  import { useWorldcupStore } from '@/stores/worldcup';
  
  const store = useWorldcupStore();
  
  onMounted(() => {
      store.getWorldcupList();
  })
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2em;
    color: #666;
    margin-bottom: 20px;
  }
  
  .worldcup-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .worldcup-item {
    margin: 10px;
  }
  
  .world-cup-box, .board-box {
    width: 150px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: transform 0.3s, background-color 0.3s;
  }
  
  .world-cup-box {
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .board-box {
    background-color: #e9e9e9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .world-cup-box:hover, .board-box:hover {
    transform: scale(1.05);
    background-color: #d9d9d9;
  }
  </style>
  