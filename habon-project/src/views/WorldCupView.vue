<template>
    <div>
        <h1>스포츠 이상형 월드컵</h1>
        <p>진행하고자 하는 월드컵을 선택하세요!</p>

        <div v-for="worldcup in store.worldcupList" :key="worldcup.id">
            <RouterLink :to="'/worldcup/' + worldcup.id">
                <div class="world-cup-box">{{ worldcup.id }}</div>
            </RouterLink>
            <RouterLink :to="'noticeBoard/' + worldcup.id">
                <div class="board-box">게시판</div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useWorldcupStore } from '@/stores/worldcup';

const store = useWorldcupStore();

onMounted(() => {
    store.getWorldcupList();
})
</script>

<style scoped></style>