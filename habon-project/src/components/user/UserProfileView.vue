<template>
    <div class="box">
      <h3>내 정보 보기</h3>
      <div class="description">- 하본 프로젝트 회원님의 정보입니다.</div>
      <div class="form">
        <div class="form-group">
          <label for="id">아이디</label>
          <p id="id">{{ user.id }}</p>
        </div>
        <div class="form-group">
          <label for="name">이름</label>
          <p id="name">{{ user.name }}</p>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <p id="email">{{ user.email }}</p>
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <p id="nickname">{{ user.nickname }}</p>
        </div>
        <div class="form-group">
          <label for="point">포인트</label>
          <p id="point">{{ user.point }}</p>
        </div>
        <hr class="divider" />
        <div class="form-group">
          <label for="sport">좋아하는 스포츠</label>
          <p id="sport">{{ user.sport }}</p>
        </div>
        <div class="form-group">
          <label for="team">좋아하는 팀</label>
          <p id="team">{{ user.team }}</p>
        </div>
        <div class="form-group">
          <label for="player">좋아하는 선수</label>
          <p id="player">{{ user.player }}</p>
        </div>
        <div class="form-group">
          <label for="img">프로필 이미지</label>
          <img :src="user.img" alt="프로필 이미지" v-if="user.img" class="profile-img" />
          <p v-else>이미지가 없습니다.</p>
        </div>
      </div>
      <button @click="promptPassword">내 정보 수정</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {useUserStore} from '@/stores/user';
  import Swal from 'sweetalert2';
  
  const user = ref(JSON.parse(sessionStorage.getItem('user')));
  const router = useRouter();

  const store = useUserStore();

  console.log(store.user.value);
  
  const promptPassword = () => {
    const checkPassword = () => {
      return Swal.fire({
        title: '비밀번호를 입력해주세요',
        input: 'password',
        inputPlaceholder: '비밀번호',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        preConfirm: (password) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (password === user.value.password) {
                resolve();
              } else {
                Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                reject();
              }
            }, 1000);
          });
        }
      });
    };
  
    checkPassword().then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'UserUpdateView' }); // 'EditUserProfile' 라우트 이름을 수정 페이지의 실제 이름으로 바꾸세요.
      }
    }).catch(() => {
      // 비밀번호가 일치하지 않을 경우의 처리 (필요 시)
    });
  };
  </script>
  
  <style scoped>
  .box {
    width: 100%;
    max-width: 800px; /* 옆으로 길게 조정 */
    margin: 50px auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  h3 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .description {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 16px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form-group label {
    font-weight: bold;
    color: #555;
  }
  
  .form-group p {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f9f9f9;
  }
  
  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  button {
    padding: 15px;
    width: 100%;
    max-width: 300px; /* 버튼 너비를 더 넓게 */
    margin: 20px auto 0; /* 상단 여백을 추가하여 버튼이 위로 붙지 않도록 */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }
  </style>
  