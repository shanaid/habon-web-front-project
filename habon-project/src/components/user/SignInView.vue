<template>
    <div class="box">
        <h3>로그인</h3>
        <div class="description">월드컵을 즐기시려면 로그인을 해주세요!</div>
        <div>
            <form @submit.prevent="signInUser" class="form">
                <div>
                    <label for="id">아이디</label>
                    <input type="text" id="id" name="id" v-model="user.id" />
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" name="password" v-model="user.password" />
                </div>
                <button type="submit">로그인</button>
                <RouterLink to="/signup">회원가입</RouterLink>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const user = ref({
    id: '',
    password: ''
})


const signInUser = () => {
    userStore.signInUser(user.value);
}

</script>

<style scoped>
h3 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.description {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
}

.box {
    width: 100%;
    max-width: 500px;
    margin: 50px auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.form div {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form div label {
    font-weight: bold;
    color: #555;
}

.form div input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.form button:hover {
    background-color: #0056b3;
}

.form a {
    text-align: center;
    margin-top: 10px;
    text-decoration: none;
    color: #007bff;
    font-size: 14px;
}

.form a:hover {
    color: #0056b3;
}
</style>
