import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_BOARD_API = "http://localhost:8080/api-board/board";

export const useBoardStore = defineStore("board", () => {
  const board = ref({});
  const router = useRouter();

  const getBoard = function (id) {
    axios.get(`${REST_BOARD_API}/${id}`).then((response) => {
      console.log("response", response);
      board.value = response.data;
    });
  }



 
  return {
    board,
    getBoard,

  };
});
