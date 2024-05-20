<template>
  <div class="container">
    <h1>스포츠 이상형 월드컵</h1>
    <p>진행하고자 하는 월드컵을 선택하세요!</p>

    <div class="worldcup-list">
      <div v-for="worldcup in store.worldcupList" :key="worldcup.id" class="worldcup-item">
        <RouterLink :to="'/worldcup/' + worldcup.id" class="world-cup-link">
          <div class="world-cup-box">{{ worldcup.subCategory }}</div>
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
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}

.worldcup-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.worldcup-item {
  margin: 20px;
  text-align: center;
}

.world-cup-link {
  text-decoration: none;
}

.world-cup-box {
  width: 180px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #333;
}

.board-link {
  display: block;
  text-decoration: none;
}

.board-box {
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  background-color: #e9e9e9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.9em;
  color: #555;
  margin: 0 auto;
}

.world-cup-box:hover {
  transform: scale(1.05);
  background-color: #d9d9d9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.board-box:hover {
  transform: scale(1.05);
  background-color: #d9d9d9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
