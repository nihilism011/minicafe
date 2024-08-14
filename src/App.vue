<template>
  <v-app>
    <Top_Menu_Bar @login="fnLogin" @signUp="fnSignUp" />
    <SideNavi />
    <v-main>
      <WelcomePage />
      <OrderPage />
      <ReviewPage />
    </v-main>
    <AdminPage v-if="false" />
    <v-dialog
      v-model="isDialog"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <SignUpPage v-if="isSignUp" @close="popclose" />
    </v-dialog>
  </v-app>
</template>

<script>
import Top_Menu_Bar from "./components/MainPageCom/Top_Menu_Bar.vue";
import SideNavi from "./components/MainPageCom/SideNavi.vue";
import AdminPage from "./components/AdminPage.vue";
import ReviewPage from "./components/ReviewPage.vue";
import SignUpPage from "./components/MainPageCom/SignUpPage.vue";
export default {
  name: "App",

  components: {
    Top_Menu_Bar,
    AdminPage,
    SideNavi,
    ReviewPage,
    SignUpPage,
  },

  data: () => ({
    isDialog: false,
    isLogin: false,
    isSignUp: false,
  }),
  methods: {
    popclose() {
      this.isDialog = false;
      this.isLogin = false;
      this.isSignUp = false;
    },
    fnSignUp() {
      this.isDialog = true;
      this.isSignUp = true;
    },
  },
};
</script>
