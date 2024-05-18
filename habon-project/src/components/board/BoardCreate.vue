<template>

    <div>
        <h4>댓글 작성</h4>
        <fieldset>
            <legend>등록</legend>
            <div>
                <label for="title">제목 : </label>
                <input type="text" id="title" v-model="board.reviewTitle">
            </div>
            <div>
                <label for="writer">작성자 : </label>
                <input type="text" id="writer" v-model="board.reviewWriter">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" cols="30" rows="10" v-model="board.reviewContent"></textarea>
            </div>
            <div>
                <button @click="createBoard">등록</button>
            </div>
        </fieldset>
    </div>

</template>

<script setup>

import { useBoardStore } from '@/stores/boarder';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios'
const route = useRoute();
const store = useBoardStore()

const board = ref({
    reviewTitle: '',
    reviewWriter: '',
    reviewContent: ''
})

const createBoard = function () {
    console.log(board.value)
    console.log(route.params.videoId)
    store.createBoard(route.params.videoId, board.value)
}

</script>

<style lang="scss" scoped></style>