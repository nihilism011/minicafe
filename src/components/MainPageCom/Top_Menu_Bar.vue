<template>
  <v-app-bar prominent app>
    <v-container
      fluid
      class="d-flex align-center"
      style="max-width: 100%; padding: 0"
    >
      <!-- 로고 -->
      <v-img src="../../assets/logo.png" contain style="height: 40px"></v-img>

      <!-- 제목 -->
      <v-toolbar-title class="title"> VUE CAFE </v-toolbar-title>

      <!-- 버튼들 -->
      <div>
        <v-btn @click="fnLogin" color="primary">Log in</v-btn>
        <v-btn @click="fnSignUp" color="success">Sign up</v-btn>
      </div>
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

<style scoped></style>
