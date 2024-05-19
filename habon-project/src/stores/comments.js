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

  const addComment = function (boardId, data) {
    axios
      .post(`${REST_COMMENT_API}/${boardId}`, data)
      .then((response) => {
        if (response.data) {
          alert("댓글 작성 성공");
          console.log(response.data);
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateComment = function (id, data) {
    axios.put(`${REST_COMMENT_API}/${id}`, data).then((response) => {
      if (response.data) {
        alert("댓글 수정 성공");
        location.reload();
      }
    });
  };

  const deleteComment = function (id) {
    axios.delete(`${REST_COMMENT_API}/${id}`).then(() => {
      alert("댓글 삭제 성공");
      location.reload();
    });
  };

  return {
    comments,
    getComments,
    addComment,
    updateComment,
    deleteComment,
  };
});
