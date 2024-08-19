<template>
  <v-app>
    <Top_Menu_Bar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import Top_Menu_Bar from "./components/headerPage/HeaderPage.vue";
export default {
  name: "App",

  components: {
    Top_Menu_Bar,
  },

  data: () => ({}),
};
</script>
<style lang="scss"></style>
