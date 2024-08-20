<template>
  <v-container>
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
        <OrderMenu v-if="selectedMenu == 'order'" />
        <div v-if="selectedMenu == 'board'">메뉴4</div>
        <div v-if="selectedMenu == 'statistics'">메뉴5</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "../AdminMenu/UserMenu.vue";
import Drink from "../AdminMenu/drinkMenu.vue";
import OrderMenu from "../AdminMenu/OrderMenu.vue";
export default {
  components: {
    OrderMenu,
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
    ],
  }),
};
</script>

<style lang=""></style>
