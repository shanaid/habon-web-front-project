<template>
    <div>
        <h1>스포츠 이상형 월드컵</h1>
        <p>진행할 라운드를 선택하세요!</p>
        <select v-model="selectedRound">
            <option value="16">16강</option>
            <option value="8">8강</option>
            <option value="4">4강</option>
        </select>
        <RouterLink :to="`${$route.path}/${selectedRound}`">라운드 선택</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';

const selectedRound = ref('16'); // 기본값은 16강
const $route = useRoute(); // 현재 라우터 정보를 가져옴

</script>

<style scoped></style>