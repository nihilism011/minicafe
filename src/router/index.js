import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/indexPage/MainPage.vue";
import DrinkPage from "@/components/indexPage/DrinkPage.vue";
import ReviewPage from "@/components/indexPage/ReviewPage.vue";
import AdminPage from "@/components/indexPage/AdminPage.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "",
      component: MainPage,
    },
    {
      path: "/MainPage",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/DrinkPage",
      name: "DrinkPage",
      component: DrinkPage,
    },
    {
      path: "/ReviewPage",
      name: "ReviewPage",
      component: ReviewPage,
    },
    {
      path: "/AdminPage",
      name: "AdminPage",
      component: AdminPage,
    },
  ],
});

export default router;
