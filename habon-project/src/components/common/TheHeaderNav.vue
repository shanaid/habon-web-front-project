<template>
    <div>
        <nav class="nav">
            <div class="total">
                <div class="left">
                    <RouterLink to="/" class="home">Home</RouterLink>
                </div>
                <div class="center">
                    <RouterLink to="/" class="worldCup">월드컵</RouterLink>
                    <RouterLink to="/noticeBoard" class="board">게시판</RouterLink>
                    <RouterLink to="/rank" class="ranking">랭킹</RouterLink>
                </div>
                <div class="right">
                    <RouterLink to="/signin" class="sign-in" v-if="!user">로그인/회원가입</RouterLink>
                    <span class="welcome" v-else>{{ user.nickname }}님 환영합니다!</span>
                    <button class="logout-button" v-if="user" @click="logout">로그아웃</button>
                </div>
            </div>
        </nav>
    </div>
    <RouterView />
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
    background-color: #444;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.total {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.left,
.center,
.right {
    display: flex;
    align-items: center;
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
    font-size: 16px;
    transition: color 0.3s ease;
}

.home:hover,
.worldCup:hover,
.board:hover,
.ranking:hover,
.sign-in:hover,
.logout-button:hover {
    color: #1e90ff;
}

.logout-button {
    background-color: #ff4500;
    border: none;
    padding: 8px 12px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #e03e00;
}
</style>
