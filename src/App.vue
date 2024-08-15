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
      max-width="1000px"
      transition="dialog-transition"
      persistent
    >
      <LogInPage v-if="isLogin" @close="popclose" />
      <SignUpPage v-if="isSignUp" @close="popclose" />
    </v-dialog>
  </v-app>
  <h-input
    v-model="ro"
    label="sssssss"
    @change="console.log(ro)"
    @input="console.log(ro)"
  />
</template>

<script>
import Top_Menu_Bar from "./components/MainPageCom/Top_Menu_Bar.vue";
import SideNavi from "./components/MainPageCom/SideNavi.vue";
import AdminPage from "./components/AdminPage.vue";
import ReviewPage from "./components/ReviewPage.vue";
import SignUpPage from "./components/MainPageCom/SignUpPage.vue";
import LogInPage from "./components/MainPageCom/LogInPage.vue";
export default {
  name: "App",

  components: {
    Top_Menu_Bar,
    AdminPage,
    SideNavi,
    ReviewPage,
    SignUpPage,
    LogInPage,
  },

  data: () => ({
    ro: "",
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
    fnLogin() {
      this.isDialog = true;
      this.isLogin = true;
    },
    fnSignUp() {
      this.isDialog = true;
      this.isSignUp = true;
    },
  },
};
</script>
<style lang="sass"></style>
