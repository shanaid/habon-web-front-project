import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_REPLY_API = "http://localhost:8080/api-reply/reply";

export const useReplyStore = defineStore("reply", () => {
  const replies = ref([]);
  const router = useRouter();

  const getReplies = function (id) {
    axios.get(`${REST_REPLY_API}/${id}`).then((response) => {
      console.log("response", response);
      replies.value = response.data;
    });
  };

  return {
    replies,
    getReplies,
  };
});
