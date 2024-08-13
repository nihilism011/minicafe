<template>
  <v-container>
    <v-row class="top-bar">
      <v-col cols="2" class="align-content-center">
        <v-img src="../assets/logo.png" max-height="60"></v-img>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="text-md-center" style="font-size: 40px">
        <v-sheet>Admin Page</v-sheet>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="align-content-center">
        <v-btn>Logout</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-card class="mx-auto" width="250">
          <v-list v-model:selected="selectedMenu" density="compact" mandatory>
            <v-list-subheader>카페 관리</v-list-subheader>
            <v-list-item
              v-for="(item, i) in menuInfo"
              :key="i"
              :value="item.value"
              active-color="primary"
            >
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <User v-if="selectedMenu == 'user'" />
        <Drink v-if="selectedMenu == 'drink'" />
        <div v-if="selectedMenu == 'order'">메뉴3</div>
        <div v-if="selectedMenu == 'board'">메뉴4</div>
        <div v-if="selectedMenu == 'statistics'">메뉴5</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "./AdminMenu/UserMenu.vue";
import Drink from "./AdminMenu/DrinkMenu.vue";
export default {
  components: {
    User,
    Drink,
  },
  data: () => ({
    selectedMenu: "user",
    menuInfo: [
      { title: "고객", value: "user" },
      { title: "음료", value: "drink" },
      { title: "주문", value: "order" },
      { title: "게시판", value: "board" },
      { title: "통계 관리", value: "statistics" },
    ],
  }),
};
</script>

<style lang=""></style>
