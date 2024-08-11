<template>
  <v-app>
    <v-main>
      <Top_Menu_Bar />
      <MainPage />
      <DrinkPage />
      <ReviewPage />
      <AdminPage />
    </v-main>
  </v-app>
  <v-app>
    <v-main> </v-main>
  </v-app>
</template>

<script>
import Top_Menu_Bar from "./components/Top_Menu_Bar.vue";
import DrinkPage from "./components/DrinkPage.vue";
import MainPage from "./components/MainPage.vue";
import ReviewPage from "./components/ReviewPage.vue";
import AdminPage from "./components/AdminPage.vue";
export default {
  name: "App",

  components: {
    Top_Menu_Bar,
    MainPage,
    DrinkPage,
    ReviewPage,
    AdminPage,
  },

  data: () => ({
    isview: "mainPage",
  }),
};
</script>
