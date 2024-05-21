<template>
  <div>
    <nav class="nav">
      <div class="total">
        <div class="left">
          <RouterLink to="/" class="home">Home</RouterLink>
        </div>
        <div class="center">
          <RouterLink to="/worldcup" class="worldCup">월드컵</RouterLink>
          <!-- <RouterLink to="/noticeBoard" class="board">게시판</RouterLink>
          <RouterLink to="/rank" class="ranking">랭킹</RouterLink> -->
        </div>
        <div class="right">
          <RouterLink to="/signin" class="sign-in" v-if="!user">로그인/회원가입</RouterLink>
          <span class="welcome" v-else>{{ user.nickname }}님 환영합니다!</span>
          <RouterLink to="/user/profile" class="sign-in" v-if="user"> <span class="welcome"> 내 정보 </span> </RouterLink>
          
          <button class="logout-button" v-if="user" @click="logout">로그아웃</button>
          

        </div>
      </div>
    </nav>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const logout = () => {
  userStore.signOutUser();
}

const user = ref(JSON.parse(sessionStorage.getItem('user')))
</script>

<style scoped>
.nav {
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.total {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
}

.left,
.center,
.right {
  display: flex;
  align-items: center;
  flex: 1; /* 각 섹션의 너비를 동일하게 설정 */
  justify-content: center; /* 가운데 정렬 */
}

.home,
.worldCup,
.board,
.ranking,
.sign-in,
.welcome,
.logout-button {
  
  margin-right: 20px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;
}

.home:hover,
.worldCup:hover,
.board:hover,
.ranking:hover,
.sign-in:hover,
.logout-button:hover {
  color: #1e90ff;
  transform: scale(1.1);
  cursor: url("../public/Chyojason.png"), auto;
}

.logout-button {
  background-color: #ff4500;
  border: none;
  padding: 10px 15px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.logout-button:hover {
  background-color: #e03e00;
  transform: scale(1.1);
}

.welcome {
  font-size: 16px;
  margin-right: 20px;
  font-weight: bold;
}

.content {
  padding-top: 70px; /* 네비게이션 바 높이만큼 패딩 추가 */
}
</style>
