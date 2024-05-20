<template>
    <div class="all">
      <div v-if="store.playWorldcupList && store.playWorldcupList.length > 1">

        <h1>{{ currentRound  }} <span v-if="currentRound !== '결승'"> 강 - {{ currentGame }}/{{ currentRound / 2 }}번째 게임</span>  </h1>
      
        <!-- {{ route.params.cnt }} -->

        <div class="choice" @click="chooseFirst">
          {{ store.playWorldcupList[0].subCategory }}: {{ store.playWorldcupList[0].name }}
           <div>{{  store.playWorldcupList[0].img  }}</div>
        </div>
        
        <div class="choice" @click="chooseSecond">
          {{ store.playWorldcupList[1].subCategory }} : {{ store.playWorldcupList[1].name }}
          <div>{{  store.playWorldcupList[1].img  }}</div>
        
        </div>
      </div>
      <div v-else-if="store.playWorldcupList.length === 1">
        <div class="winner">
          우승: {{ store.playWorldcupList[0].name }}
        </div>

        <RouterLink :to="'/noticeBoard/' + route.params.id">
                <div class="board-box">해당 월드컵 게시판으로 ! </div>
        </RouterLink>


      </div>
      <div v-else>
        <div>리스트가 비어 있습니다.</div>
      </div>
    </div>
  
    <div class="updatelist">
      <h3>업데이트 리스트</h3>
      <ul>
        <li v-for="item in updatelist" :key="item.name">{{ item.name }} - {{ item.information }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useWorldcupStore } from '@/stores/worldcup';
  
  const store = useWorldcupStore();
  const route = useRoute();
  
  const updatelist = ref([]);// 업데이트 할 리스트를 담는 배열, 랭크 올릴 리스트

  const currentRound = ref(route.params.cnt); // 몇강인지 체크 -> 시작할때 정한 값을 가져온다.

  const currentGame = ref(1);   // 현재 N번째 강에서 몇번째 게임인지 체크

  const totalGamesInCurrentRound = ref(0); //토탈 게임 라운드
  

  const initializeRound = () => { 

    const length = store.playWorldcupList.length; // 현재 월드컵 수를 구해서
    
    if (length > 8) {   // 8개 이상이면 (9~16이라면)
      currentRound.value = '16';  //16강으로 표기
      totalGamesInCurrentRound.value = 8; //토탈 밸류는 8
      
    } else if (length > 4) { //4강 이상이면
      currentRound.value = '8'; // 8강으로 표기
      totalGamesInCurrentRound.value = 4;
    }
     else if (length > 2) { //2강 이상이면
      currentRound.value = '4'; //4강으로 표기
      totalGamesInCurrentRound.value = 2;
    } else {
      currentRound.value = '결승'; //아니면 결승
      totalGamesInCurrentRound.value = 1;
    }

    if(currentRound.value != route.params.cnt){ //만약 맨 처음을 제외하고
    currentGame.value = 1;} //현재 게임수 초기화
  };
  
  const updateGame = () => {//뭘 누를 때 마다
    currentGame.value += 1; //현재 게임수 늘리고

    // if (currentGame.value > totalGamesInCurrentRound.value) { //현재 게임수가 토탈 게임수 보다 많아지면
    //   initializeRound(); //위에 있는 함수 호출
    // }

  };
  
  
  const chooseFirst = () => { //첫번 째 요소 선택시
    if (store.playWorldcupList.length > 1) { //만약 게임을 즐길 리스트 사이즈가 1보다 크담면
      updatelist.value.push(store.playWorldcupList[0]);  //헤당 요소를 update 요소에 넣고

      store.playWorldcupList.splice(0, 2); // 첫 번째 및 두 번째 항목 제거

      if (store.playWorldcupList.length === 0) { //그러다 그 판이 끝나면

        store.rankUpWorldcup(route.params.id,updatelist.value); //랭크 업데이트를 해주고
        
        store.playWorldcupList = [...updatelist.value]; // update에 있는 모든 요소를 play에 넣어주고

        updatelist.value = []; // 업데이트는 비워준다

        initializeRound(); //

      } else {
        //안끝났다면 업데이트로 간다.
        updateGame();

      }
    }
  };
  
  const chooseSecond = () => { // 똑같이 행동 
    if (store.playWorldcupList.length > 1) {
      updatelist.value.push(store.playWorldcupList[1]);
      store.playWorldcupList.splice(0, 2); // 첫 번째 및 두 번째 항목 제거
      if (store.playWorldcupList.length === 0) {

        store.rankUpWorldcup(route.params.id,updatelist.value);
        //랭크 업데이트

        store.playWorldcupList = [...updatelist.value];
        updatelist.value = [];
        initializeRound();
      } else {
        updateGame();
      }
    }
  };
  


  onMounted(async () => {


    const worldcupId = route.params.worldcupId;
    if (!worldcupId) {
      console.error('worldcupId가 정의되지 않았습니다.');
      return;
    }
    console.log(`Worldcup ID: ${worldcupId}`);
    
    // 초기 데이터 로딩
    await store.playWorldcup(worldcupId);
    initializeRound();
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
  