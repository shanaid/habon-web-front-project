import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_NOTICEBOARD_API = "http://localhost:8080/api-Noticeboard/noticeboard";

export const useNoticeBoardStore = defineStore("noticeBoard", () => {
  const noticeBoard = ref({});
  const router = useRouter();

 
  return {
    noticeBoard,
  };
});
