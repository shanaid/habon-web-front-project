<template>
  <div class="container">
    <h1>스포츠 이상형 월드컵</h1>
    <p>진행하고자 하는 월드컵을 선택하세요!</p>

    <div class="worldcup-list">
      <div v-for="worldcup in store.worldcupList" :key="worldcup.id" class="worldcup-item">
        <RouterLink :to="'/worldcup/' + worldcup.id">
          <div class="world-cup-box">{{ worldcup.id }}</div>
        </RouterLink>
        <RouterLink :to="'/noticeBoard/' + worldcup.id" class="board-link">
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
  text-align: center; /* Ensure items are centered */
}

.world-cup-box {
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.3s, background-color 0.3s;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.board-link {
  display: block; /* Ensure the link takes up the whole block */
}

.board-box {
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.3s, background-color 0.3s;
  background-color: #e9e9e9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9em; /* Smaller font size for board box */
  margin: 0 auto; /* Center the board box */
}

.world-cup-box:hover {
  transform: scale(1.05);
  background-color: #d9d9d9;
}

.board-box:hover {
  transform: scale(1.05);
  background-color: #d9d9d9;
}
</style>
