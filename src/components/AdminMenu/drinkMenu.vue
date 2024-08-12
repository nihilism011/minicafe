<template>
  <v-btn color="orange" @click="fnInsertDrink">추가</v-btn>
  <v-dialog
    v-model="isInfoDrink"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <DrinkInfo v-if="isInfoDrink" @close="fnInsertDrink" />
  </v-dialog>
  <div class="d-flex flex-row mb-2">
    <v-card
      v-for="item in drinkList"
      :key="item.DRINKNO"
      class="mx-auto"
      max-width="250"
      min-width="200"
    >
      <v-img class="align-end text-white" height="200" :src="item.URL" cover>
      </v-img>
      <v-card-title>{{ item.DRINKNAME }}</v-card-title>
      <v-card-subtitle> {{ item.CATEGORY }}/{{ item.ISICE }} </v-card-subtitle>
      <v-card-text> {{ item.PRICE }}원 </v-card-text>
      <v-card-actions>
        <v-btn color="orange">수정</v-btn>
        <v-btn color="orange">삭제</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import DrinkInfo from "./DrinkInfo.vue";
import axios from "axios";

export default {
  components: {
    DrinkInfo,
  },
  data() {
    return {
      isInfoDrink: false,
      drinkList: [],
    };
  },
  methods: {
    fnInsertDrink() {
      this.isInfoDrink = !this.isInfoDrink;
    },
    async fnGetDrinkList() {
      try {
        const url = `http://localhost:3000/drinkList`;
        const response = await axios.get(url);
        this.drinkList = response.data;
      } catch (error) {
        console.error("Error fetching user list", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
  mounted() {
    this.fnGetDrinkList();
  },
};
</script>
