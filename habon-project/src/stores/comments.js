import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_COMMENT_API = "http://localhost:8080/api-comment/comment";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);
  const router = useRouter();

  const getComments = function (id) {
    axios.get(`${REST_COMMENT_API}/${id}`).then((response) => {
      console.log("response", response);
      comments.value = response.data;
    });
  };

  return {
    comments,
    getComments,
  };
});
