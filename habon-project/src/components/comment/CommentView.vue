<template>
    <div class="container">
      <h2>댓글</h2>
      <hr>
      <div class="comment-list">
        <div class="comment-item" v-for="comment in store.comments" :key="comment.id">
          <div class="comment-writer">{{ comment.writer }}</div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-regist-date">{{ comment.registDate }}</div>
          <hr>
          <div class="reply-list">
            <div class="reply-item" v-for="reply in filteredReplies(comment.id)" :key="reply.id">
              <div class="reply-writer">{{ reply.writer }}</div>
              <div class="reply-content">{{ reply.content }}</div>
              <div class="reply-regist-date">{{ reply.registDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCommentStore } from '@/stores/comments';
  import { useReplyStore } from '@/stores/reply';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const store = useCommentStore();
  const replyStore = useReplyStore();
  
  // 필터링된 답글 목록을 반환하는 함수
  const filteredReplies = (commentId) => {
      return replyStore.replies.filter(reply => reply.commentId === commentId);
  };
  
  onMounted(() => {
      store.getComments(route.params.id);
      replyStore.getReplies(route.params.id); // 댓글 ID를 사용하여 답글을 가져옵니다.
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
  }
  
  .comment-list {
    margin-top: 20px;
  }
  
  .comment-item, .reply-item {
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .comment-writer, .reply-writer {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .comment-content, .reply-content {
    margin-bottom: 10px;
  }
  
  .comment-regist-date, .reply-regist-date {
    font-size: 0.8em;
    color: #999;
  }
  
  .reply-list {
    margin-left: 20px;
    margin-top: 10px;
    padding-left: 10px;
    border-left: 2px solid #ddd;
  }
  </style>
  