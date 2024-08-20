<template>
  <v-app>
    <Top_Menu_Bar ref="reload" />
    <v-main>
      <RouterView @logout="fnir" @kiki="fniz" />
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
  methods: {
    fnir() {
      this.$refs.reload.fnPropLogOut();
    },
    fniz() {
      this.$refs.reload.fnLogOn();
    },
  },
};
</script>
<style lang="scss"></style>
