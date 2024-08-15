<template>
  <v-app-bar height="100px" prominent app>
    <v-container fluid max-width=" 100%">
      <v-row>
        <v-col cols="2" class="pa-0">
          <v-img src="../../assets/cafeLogo.png" height="100px"></v-img>
        </v-col>

        <v-col colss="8" class="pa-0">
          <v-container>
            <v-row>
              <v-col class="pa-0">
                <h1 class="title">Cafe Mini</h1>
              </v-col>
            </v-row>
            <v-row class="customFont">
              <v-col cols="2">카페 소개</v-col>
              <v-col cols="2">메뉴</v-col>
              <v-col cols="2">리뷰</v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="2" class="d-flex align-center justify-center pa-0">
          <v-btn @click="fnLogin" color="primary">Log in</v-btn>
          <v-btn @click="fnSignUp" color="success">Sign up</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    fnLogin() {
      this.$emit("login");
    },
    fnSignUp() {
      this.$emit("signUp");
    },
  },
};
</script>

<style scoped>
.customFont {
  font-size: large;
  font-weight: 600;
  font-family: "Open Sans", "Noto Sans KR", "Apple SD 산돌고딕 Neo",
    "Apple SD Gothic Neo", "나눔고딕", NanumGothic, ng, sans-serif !important;
}
</style>
