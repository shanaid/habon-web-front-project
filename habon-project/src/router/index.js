import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import UserProfileView from "@/components/user/UserProfileView.vue";
import SignUpView from "@/components/user/SignUpView.vue";
import SignInView from "@/components/user/SignInView.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
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
  ]
})

export default router
