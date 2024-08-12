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
            <!-- 카페 관리 섹션 -->
            <v-list-subheader>카페 관리</v-list-subheader>
            <v-list-item
              v-for="(item, i) in items.slice(0, 3)"
              :key="i"
              :value="item.value"
              active-color="primary"
            >
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- 게시판 관리 섹션 -->
            <v-list-subheader>게시판 관리</v-list-subheader>
            <v-list-item
              v-for="(item, i) in items.slice(3, 5)"
              :key="i"
              :value="item.value"
              active-color="primary"
            >
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <!-- 통계 관리 섹션 -->
            <v-list-item
              v-for="(item, i) in items.slice(5)"
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
        <userList v-if="selectedMenu == 1" />
        <drinkMenu v-if="selectedMenu == 2" />
        <div v-if="selectedMenu == 3">메뉴3</div>
        <div v-if="selectedMenu == 4">메뉴4</div>
        <div v-if="selectedMenu == 5">메뉴5</div>
        <div v-if="selectedMenu == 6">메뉴6</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userList from "./AdminMenu/userList.vue";
import drinkMenu from "./AdminMenu/drinkMenu.vue";
export default {
  components: {
    userList,
    drinkMenu,
  },
  data: () => ({
    selectedMenu: 1,
    items: [
      { title: "고객", value: 1 },
      { title: "음료", value: 2 },
      { title: "주문", value: 3 },
      { title: "공지사항", value: 4 },
      { title: "리뷰", value: 5 },
      { title: "통계 관리", value: 6 },
    ],
  }),
};
</script>

<style lang=""></style>
