<template>
  <v-app>
    <v-main>
      <v-btn color="primary">Vuetify 버튼</v-btn>
      <v-btn color="primary"></v-btn>
      <v-btn depressed color="pink">click me</v-btn>
      <HelloWorld />
    </v-main>
  </v-app>
  <v-app>
    <v-main> </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
