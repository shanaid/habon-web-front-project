<template>

    <div>
        <h4>댓글 수정</h4>
        <fieldset>
            <legend>수정</legend>
            <div>
                <label for="title">제목 : </label>
                <input type="text" id="title" v-model="store.board.reviewTitle">
            </div>
            <div>
                <label for="writer">작성자 : </label>
                <input type="text" id="writer" v-model="store.board.reviewWriter">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" cols="30" rows="10" v-model="store.board.reviewContent"></textarea>
            </div>
            <div>
                <button @click="updateBoard">변경</button>
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

const updateBoard = function () {
    // console.log(store.board.reviewId)
    store.updateBoard(store.board.reviewId)
}

</script>

<style scoped>
h4 {
    text-align: center;
}

fieldset {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #333;
    border-radius: 10px;
}

legend {
    text-align: center;
}

label {
    display: inline-block;
    width: 100px;
}

input,
textarea {
    width: 100%;
    margin-bottom: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
}
</style>