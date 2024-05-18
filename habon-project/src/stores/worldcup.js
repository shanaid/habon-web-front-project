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

  return {
    worldcup,
    worldcupList,
    getWorldcupList,
  };
});
