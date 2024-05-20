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

  const addReply = function (boardId, commentId, data) {
    data.commentId = commentId; // commentId 필드를 데이터에 추가
    axios
      .post(`${REST_REPLY_API}/${boardId}/${commentId}`, data)
      .then((response) => {
        if (response.data) {
          replies.value.push(response.data); // 응답 데이터를 replies 배열에 추가
          alert("답글 작성 성공");
          console.log(response.data);
          location.reload(); // 답글 작성 후 페이지 새로고침
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReply = function (id, data) {
    axios.put(`${REST_REPLY_API}/${id}`, data).then((response) => {
      if (response.data) {
        const index = replies.value.findIndex((reply) => reply.id === id);
        if (index !== -1) {
          replies.value[index] = response.data;
          alert("답글 수정 성공");
        }
      }
    });
  };

  const deleteReply = function (id) {
    axios.delete(`${REST_REPLY_API}/${id}`).then(() => {
      replies.value = replies.value.filter((reply) => reply.id !== id);
      alert("답글 삭제 성공");
    });
  };

  return {
    replies,
    getReplies,
    addReply,
    updateReply,
    deleteReply,
  };
});
