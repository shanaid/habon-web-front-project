<template>
    <div class="all">
      <div v-if="store.playWorldcupList && store.playWorldcupList.length > 1">
        <div class="choice" @click="chooseFirst">
          처음: {{ store.playWorldcupList[0].name }}
        </div>
  
        <div class="choice" @click="chooseSecond">
          두번째: {{ store.playWorldcupList[1].name }}
        </div>
      </div>
      <div v-else-if="store.playWorldcupList.length === 1">
        <div class="winner">
          우승: {{ store.playWorldcupList[0].name }}
        </div>
      </div>
      <div v-else>
        <div>리스트가 비어 있습니다.</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useWorldcupStore } from '@/stores/worldcup';
  
  const store = useWorldcupStore();
  const route = useRoute();
  
  const selectedRound = ref('16'); // 기본값은 16강
  const playlist = ref([]);
  const updatelist = ref([]);
  
  const chooseFirst = () => {
    if (store.playWorldcupList.length > 1) {
      updatelist.value.push(store.playWorldcupList[0]);
      store.playWorldcupList.splice(1, 1); // 두 번째 항목 제거
      store.playWorldcupList.splice(0, 1); // 첫 번째 항목 제거 후 남은 배열의 첫 번째 항목 유지
      if (store.playWorldcupList.length === 0) {
        store.playWorldcupList = [...updatelist.value];
        updatelist.value = [];
      }
    }
  };
  
  const chooseSecond = () => {
    if (store.playWorldcupList.length > 1) {
      updatelist.value.push(store.playWorldcupList[1]);
      store.playWorldcupList.splice(1, 1); // 두 번째 항목 제거
      store.playWorldcupList.splice(0, 1); // 첫 번째 항목 제거
      if (store.playWorldcupList.length === 0) {
        store.playWorldcupList = [...updatelist.value];
        updatelist.value = [];
      }
    }
  };
  
  onMounted(() => {
    const worldcupId = route.params.worldcupId;
    if (!worldcupId) {
      console.error('worldcupId가 정의되지 않았습니다.');
      return;
    }
    console.log(`Worldcup ID: ${worldcupId}`);
    
    // 초기 데이터 로딩
    store.playWorldcup(worldcupId, selectedRound.value);
  });
  </script>
  
  <style scoped>
  .choice {
    margin: 10px;
    padding: 10px;
    border: 1px solid #000;
    cursor: pointer;
  }
  .winner {
    font-size: 24px;
    font-weight: bold;
    color: green;
  }
  </style>
  