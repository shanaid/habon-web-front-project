<template>
    <div>
        <h1>스포츠 이상형 월드컵</h1>
        <p>진행할 라운드를 선택하세요!</p>
        <select v-model="selectedRound">
            <option value="16">16강</option>
            <option value="8">8강</option>
            <option value="4">4강</option>
        </select>
        <RouterLink :to="`${$route.path}/${selectedRound}`" @click="initializeRound">라운드 선택</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import {useWorldcupStore} from '@/stores/worldcup'

const selectedRound = ref('16'); // 기본값은 16강
const $route = useRoute(); // 현재 라우터 정보를 가져옴

const store = useWorldcupStore(); //월드컵 피니아 사용

//버튼을 누르는 순간  storeplayList에 월드컵이 저장됩니다!
const initializeRound = () => {

    // console.log($route.params.id);
    // console.log(selectedRound.value);
    
    store.playWorldcup($route.params.id,selectedRound.value);
}

</script>

<style scoped></style>