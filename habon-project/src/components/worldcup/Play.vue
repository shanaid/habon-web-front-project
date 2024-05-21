<template>
  <div class="all">
    <div v-if="store.playWorldcupList && store.playWorldcupList.length > 1">
      <h1>{{ currentRound }} <span v-if="currentRound !== '결승'">강 - {{ currentGame }}/{{ currentRound / 2 }}번째 게임</span></h1>

      <div class="choices-container">
        <div class="choice fir" @click="chooseFirst">
          <div class="choice-img">
            <!-- <img :src="`store.playWorldcupList[0].img`" alt="Image 1"> -->

            
            <img :src="store.playWorldcupList[0].img" alt="Image 1">



          </div>
          <div class="choice-text">
            {{ store.playWorldcupList[0].subCategory }}: {{ store.playWorldcupList[0].name }}
          </div>
        </div>

        <div class="choice sec" @click="chooseSecond">
          <div class="choice-img">
            <img :src="store.playWorldcupList[1].img" alt="Image 2">
          </div>
          <div class="choice-text">
            {{ store.playWorldcupList[1].subCategory }}: {{ store.playWorldcupList[1].name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="store.playWorldcupList.length === 1">

      <div v-if="store.point">
       <button :disabled="pointClaimed" @click="randomPoint" :class="{ disabled: pointClaimed }">포인트 얻기</button>
      </div>
      
      <div class="winner-container">
      

        <div class="winner">
          우승: {{ store.playWorldcupList[0].name }}
        </div>

        <RouterLink :to="'/noticeBoard/' + route.params.id">
          <div class="board-box">해당 월드컵 게시판으로 ! </div>
        </RouterLink>

      </div>
      <RankView />
    </div>
    <div v-else>
      <div>리스트가 비어 있습니다.</div>
    </div>
  </div>

  <div>싸피!~!!</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWorldcupStore } from '@/stores/worldcup';
import RankView from './RankView.vue';

const store = useWorldcupStore();
const route = useRoute();

const updatelist = ref([]); // 업데이트 할 리스트를 담는 배열, 랭크 올릴 리스트

const currentRound = ref(route.params.cnt); // 몇강인지 체크 -> 시작할때 정한 값을 가져온다.

const currentGame = ref(1); // 현재 N번째 강에서 몇번째 게임인지 체크

const totalGamesInCurrentRound = ref(0); //토탈 게임 라운드

const pointClaimed = ref(false); // 포인트가 뽑혔는지 여부

const initializeRound = () => {
  const length = store.playWorldcupList.length; // 현재 월드컵 수를 구해서

  if (length > 8) { // 8개 이상이면 (9~16이라면)
    currentRound.value = '16'; //16강으로 표기
    totalGamesInCurrentRound.value = 8; //토탈 밸류는 8
  } else if (length > 4) { //4강 이상이면
    currentRound.value = '8'; // 8강으로 표기
    totalGamesInCurrentRound.value = 4;
  } else if (length > 2) { //2강 이상이면
    currentRound.value = '4'; //4강으로 표기
    totalGamesInCurrentRound.value = 2;
  } else {
    currentRound.value = '결승'; //아니면 결승
    totalGamesInCurrentRound.value = 1;
  }

  if(currentRound.value != route.params.cnt){ //만약 맨 처음을 제외하고
    currentGame.value = 1;} //현재 게임수 초기화
};

const updateGame = () => { //뭘 누를 때 마다
  currentGame.value += 1; //현재 게임수 늘리고
};

const chooseFirst = () => { //첫번 째 요소 선택시
  if (store.playWorldcupList.length > 1) { //만약 게임을 즐길 리스트 사이즈가 1보다 크담면
    updatelist.value.push(store.playWorldcupList[0]); //헤당 요소를 update 요소에 넣고
    store.playWorldcupList.splice(0, 2); // 첫 번째 및 두 번째 항목 제거

    if (store.playWorldcupList.length === 0) { //그러다 그 판이 끝나면
      store.rankUpWorldcup(route.params.id, updatelist.value); //랭크 업데이트를 해주고
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
      store.rankUpWorldcup(route.params.id, updatelist.value); //랭크 업데이트를 해주고
      store.playWorldcupList = [...updatelist.value]; // update에 있는 모든 요소를 play에 넣어주고
      updatelist.value = []; // 업데이트는 비워준다
      initializeRound(); //
    } else {
      //안끝났다면 업데이트로 간다.
      updateGame();
    }
  }
};

const randomPoint = () => {
  store.getPoint();
  pointClaimed.value = true; // 포인트 버튼을 클릭한 것으로 표시
};

onMounted(async () => {
  const worldcupId = route.params.worldcupId;
  if (!worldcupId) {
    return;
  }
  
  // 초기 데이터 로딩
  await store.playWorldcup(worldcupId);
  initializeRound();
});
</script>

<style scoped>
.all {
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

.choices-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.choice {
  width: 45%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: url("../public/hyojason.png"), auto;
  transition: transform 0.3s, background-color 0.3s;
  position: relative;
}

.choice * {
  pointer-events: none; /* 하위 요소가 클릭 이벤트를 차단하도록 설정 */
}

.sec {
  background-color: #4169E1;
}

.fir {
  background-color: #8b0029;
}

.fir:hover, .sec:hover {
  cursor: url("../public/Chyojason.png"), auto;
  transform: scale(1.05);
}

.fir:hover {
  background-color: #d6cabc;
}

.sec:hover {
  background-color: white;
}

.choice-img img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.choice-text {
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
}

.winner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.winner {
  font-size: 3em;
  font-weight: bold;
  color: green;
  margin-bottom: 10px;
}

.board-box {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: url("../public/hyojason.png"), auto;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
}

.board-box:hover {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #45a049;
  transform: scale(1.05);
}

button {
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: url("../public/hyojason.png"), auto;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #0056b3;
  transform: scale(1.05);
}

button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
