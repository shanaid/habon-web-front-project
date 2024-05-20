import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_USER_API = "http://localhost:8080/api-user/user";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const router = useRouter();

  const signInUser = function (loginUser) {
    axios
      .post(REST_USER_API + "/login", loginUser)
      .then((response) => {
        if (response.data) {
          alert("로그인 성공");
          console.log(response.data);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          user.value = response.data;
          router.push({ name: "Home" }).then(() => {
            location.reload();
          });
        }
      })
      .catch((error) => {
        alert("잘못된 아이디 혹은 비밀번호입니다.");
        console.log(error);
      });
  };

  const signOutUser = function () {
    axios
      .delete(REST_USER_API + "/logout")
      .then((response) => {
        if (response.data) {
          alert("로그아웃 성공");
          sessionStorage.removeItem("user");
          user.value = {};
          router.push({ name: "Home" }).then(() => {
            location.reload();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpUser = function (registerUser) {
    axios
      .post(REST_USER_API + "/regist", registerUser)
      .then((response) => {
        if (response.data) {
          alert("회원가입 성공");
          console.log(response.data);
          router.push({ name: "Home" }).then(() => {
            location.reload();
          });
        }
      })
      .catch((error) => {
        alert("이미 존재하는 아이디입니다.");
        console.log(error);
      });
  };


  return {
    user,
    signInUser,
    signOutUser,
    signUpUser,
  };
});
