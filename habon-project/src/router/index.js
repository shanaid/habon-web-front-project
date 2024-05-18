import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import UserProfileView from "@/components/user/UserProfileView.vue";
import SignUpView from "@/components/user/SignUpView.vue";
import SignInView from "@/components/user/SignInView.vue";
import WorldCupView from "@/views/WorldCupView.vue";
import ChooseCnt from "@/components/worldcup/ChooseCnt.vue";
import Play from "@/components/worldcup/Play.vue";
import NoticeBoard from "@/components/NoticeBoard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/user",
      name: "User",
      component: UserView,
      children: [
        {
          path: "profile",
          name: "UserProfile",
          component: UserProfileView,
        },
      ],
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUpView,
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignInView,
    },
    {
      path: "/worldcup",
      name: "WorldCup",
      children: [
        {
          path: "",
          name: "WorldCupView",
          component: WorldCupView,
        },
        {
          path: ":id",
          name: "ChooseCnt",
          component: ChooseCnt,
        },
        {
          path: ":id/:cnt",
          name: "Play",
          component: Play,
        },
      ]
    },
    {
      path: "/noticeBoard/:id",
      name: "NoticeBoard",
      component: NoticeBoard
    }
  ],
});

export default router;
