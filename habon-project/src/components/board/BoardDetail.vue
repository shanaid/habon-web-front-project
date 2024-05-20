<template>
  <div class="container">
    <h1>게시판 상세</h1>
    <div class="button-container">
      <RouterLink :to="'/board/update/' + store.board.id">
        <button class="update-button" v-if="loginUser && store.board.userId === loginUser.id">수정</button>
      </RouterLink>
      <button class="delete-button" @click="deleteBoard" v-if="loginUser && store.board.userId === loginUser.id">
        삭제
      </button>
      <button class="like-button" @click="toggleLike" v-if="loginUser">
        {{ isLiked ? '좋아요 취소' : '좋아요' }} ({{ store.board.likeCount }})
      </button>
    </div>
    <div class="board-content">
      <div class="board-header">
        <div class="board-item-title">
          <h2>{{ store.board.title }}</h2>
        </div>
        <div class="board-meta">
          <div class="board-item-writer">
            <span>작성자: {{ store.board.writer }}</span>
          </div>
          <div class="board-item-regist-date">
            <span>작성일: {{ store.board.registDate }}</span>
          </div>
          <div class="board-item-view-cnt">
            <span>조회수: {{ store.board.viewCount }}</span>
          </div>
        </div>
      </div>
      <div class="board-item-content">
        <p>{{ store.board.content }}</p>
      </div>
    </div>
    <hr />
    <CommentView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { useLikeStore } from '@/stores/like';
import { onMounted, ref } from 'vue';
import CommentView from '../comment-reply/CommentView.vue';

const route = useRoute();
const store = useBoardStore();
const likeStore = useLikeStore();

const loginUser = JSON.parse(sessionStorage.getItem('user'));
const isLiked = ref(false);

const checkLikeStatus = async () => {
  if (!loginUser) return;
  await likeStore.likeCheck('board', route.params.id);
  isLiked.value = likeStore.islike;
};

const toggleLike = async () => {
  if (!loginUser) {
    alert('로그인이 필요합니다.');
    return;
  }

  isLiked.value = !isLiked.value; // 좋아요 상태를 즉시 반영
  await likeStore.likeclick('board', route.params.id);
  await store.getBoard(route.params.id); // 게시글 데이터를 다시 불러와 좋아요 수 업데이트
};

const deleteBoard = async () => {
  await store.deleteBoard(route.params.id);
  // 게시글 삭제 후 다른 페이지로 이동하도록 설정
  // 예: router.push('/board');
};

onMounted(async () => {
  await store.getBoard(route.params.id);
  await checkLikeStatus();
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.update-button,
.delete-button,
.like-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.update-button {
  background-color: #4caf50;
  color: white;
}

.update-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

.like-button {
  background-color: #ff9800;
  color: white;
}

.like-button:hover {
  background-color: #e68900;
  transform: scale(1.05);
}

.board-content {
  text-align: left;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-header {
  margin-bottom: 20px;
}

.board-item-title h2 {
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
}

.board-meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #666;
}

.board-item-content p {
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
