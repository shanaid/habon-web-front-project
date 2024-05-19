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


  const createBoard = function (worldcupId, data) {
    axios
      .post(`${REST_BOARD_API}/${worldcupId}`, data)
      .then((response) => {
        if (response.data) {
          alert("게시글 작성 성공");
          console.log(response.data);
          router.push({ name: "NoticeBoard", params:{ id:worldcupId } }).then(() => {
            location.reload();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteBoard = function (id) {
    const worldcupId = board.value.worldcupId;
    axios.delete(`${REST_BOARD_API}/${id}`).then(() => {
        alert("게시글 삭제 성공");
        router.push({ name: "NoticeBoard", params:{ id:worldcupId } }).then(() => {
          location.reload();
        });
    });
  }
 
  const modifyBoard = function (id, data) {
    axios.put(`${REST_BOARD_API}/${id}`, data).then((response) => {
      if (response.data) {
        alert("게시글 수정 성공");
        router.push({ name: "NoticeBoard", params:{ id:board.value.worldcupId } }).then(() => {
          location.reload();
        });
      }
    });
  }

  return {
    board,
    getBoard,
    createBoard,
    deleteBoard,
    modifyBoard,
  };
});
