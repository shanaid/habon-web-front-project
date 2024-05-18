import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_BOARD_API = "http://localhost:8080/api-board/board";

export const useBoardStore = defineStore("board", () => {
  const board = ref({});
  const router = useRouter();

 
  return {
    board,
  };
});
