import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_WORLDCUP_API = "http://localhost:8080/api-Worldcup/worldcup";

export const useWorldcupStore = defineStore("worldcup", () => {
  const worldcup = ref({});
  const worldcupList = ref([]);
  const router = useRouter();

  const getWorldcupList = function () {
    axios.get(REST_WORLDCUP_API).then((response) => {
      if (response.data) {
        console.log(response.data);
        worldcupList.value = response.data;
      }
    });
  };

  const playWorldcupList = ref([]);

  const playWorldcup = function(worldcupId, cnt){
    axios
    .get(`${REST_WORLDCUP_API}/${worldcupId}/${cnt}`)
    .then((response)=>{
      alert( cnt + "강 월드컵을 진행합니다!");
      console.log(response.data);
      playWorldcupList.value = response.data;
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
      router.push({name:"Home"})
    });
  };


  const rankUpWorldcup = function(worldcupId,data){
    axios
    .post(`${REST_WORLDCUP_API}/${worldcupId}`, data)
    .then(()=>{
      
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });

  }

  return {
    worldcup,
    worldcupList,
    getWorldcupList,
    playWorldcupList,
    playWorldcup,
    rankUpWorldcup,
  };
});
