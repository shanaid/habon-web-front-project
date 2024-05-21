import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import UserProfileView from "@/components/user/UserProfileView.vue";
import UserUpdateView from "@/components/user/UserUpdateView.vue"
import SignUpView from "@/components/user/SignUpView.vue";
import SignInView from "@/components/user/SignInView.vue";
import WorldCupView from "@/views/WorldCupView.vue";
import ChooseCnt from "@/components/worldcup/ChooseCnt.vue";
import Play from "@/components/worldcup/Play.vue";
import NoticeBoard from "@/components/NoticeBoard.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardCreate from "@/components/board/BoardCreate.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";
import RankView from "@/components/worldcup/RankView.vue";

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
      path: "/update",
      name: "UserUpdateView",
      component: UserUpdateView,
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
        {
          path:"result/:id",
          name:"Ranking",
          component: RankView
        }
      ]
    },
    {
      path: "/noticeBoard/:id",
      name: "NoticeBoard",
      component: NoticeBoard
    },
    {
      path: "/board",
      name: "board",
      children: [
        {
          path: ":id",
          name: "BoardDetail",
          component: BoardDetail,
        },
        {
          path: "create/:worldcupId",
          name: "BoardCreate",
          component: BoardCreate,
        },
        {
          path: "update/:id",
          name: "BoardUpdate",
          component: BoardUpdate
        },
      ],
    },
  ],
});

export default router;
