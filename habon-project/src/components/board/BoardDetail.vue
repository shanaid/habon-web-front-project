<template>

    <h3>영상 상세</h3>
    <hr>
    <td class="video"><iframe class="video-link" width="860" height="640" v-bind:src="store.video.videoUrl"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></td>
    <hr>
    <div class="video-content">
        <div>비디오 아이디 : {{ store.video.videoId }}</div>
        <div>비디오 제목 : {{ store.video.videoTitle }}</div>
        <div>비디오 장르 : {{ store.video.videoCategory }}</div>
        <div>채널 이름 : {{ store.video.videoChannelName }}</div>
        <div> 조회수 : {{ store.video.videoViewCount }}</div>
    </div>
    <hr>
    <div class="total">
        <div v-if="isLoggedIn">
            <button @click="deleteBoard">삭제</button>
            <button @click="updateBoard">수정</button>
        </div>
        <div>리뷰 상세</div>
        <hr>
        <div class="review">
            <div class="review-title">리뷰 제목 : {{ storeBoard.board.reviewTitle }}</div>
            유저 아이디 : {{ storeBoard.board.userId }}
            <div class="review-writer">리뷰 쓴이 : {{ storeBoard.board.reviewWriter }}</div>
            <div class="review-reg">리뷰 작성일 : {{ storeBoard.board.reviewRegistDate }}</div>
            <div class="review-viewCnt">리뷰 조회수 : {{ storeBoard.board.reviewViewCount }}</div>
            <hr>
            <div class="review-content">리뷰 내용 : {{ storeBoard.board.reviewContent }}</div>
        </div>

    </div>
</template>

<script setup>

// import { useVideoStore } from '@/stores/video';

import { useBoardStore } from '@/stores/boarder';
import { useVideoStore } from '@/stores/video';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios'



const store = useVideoStore()
// const store = useVideoStore()
const storeBoard = useBoardStore()
const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(false)


onMounted(async () => {
    await store.getVideo(route.params.id)
    const board = await storeBoard.getOneBoard(route.params.id)

    const user = JSON.parse(sessionStorage.getItem('user'))
    const boardUserId = board.value.userId

    console.log(boardUserId)
    if (boardUserId === user.userId) {
        isLoggedIn.value = true
    }
})





const deleteBoard = () => {
    // storeBoard.deleteBoard(route.params.id)
    storeBoard.deleteBoard(storeBoard.board.reviewId)
}

const updateBoard = function () {
    router.push({ name: 'BoardUpdate' })
}



</script>

<style scoped>
.total {
    margin: 0 auto;
    width: 50%;
    text-align: center;
}

button {
    margin: 10px;
}

h3 {
    text-align: center;
}

.video {
    display: flex;
    justify-content: center;
}

.video-link {
    margin: 0 auto;
}

.video-content {
    text-align: center;
}


.review-title {
    margin: 10px;
}

.review-writer {
    margin: 10px;
}

.review-reg {
    margin: 10px;
}

.review-viewCnt {
    margin: 10px;
}

.review-content {
    margin: 10px;
}
</style>