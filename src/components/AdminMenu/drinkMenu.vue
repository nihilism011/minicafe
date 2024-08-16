<template>
  <v-container fluid>
    <!-- 카테고리 필터 섹션 -->
    <v-card class="mb-4">
      <v-card-title>CATEGORY</v-card-title>
      <v-card-actions>
        <v-chip
          color="primary"
          filter
          :input-value="isAllSelected"
          @click="toggleAll"
          class="ma-2"
        >
          ALL
        </v-chip>
        <v-chip-group v-model="selectMenu" multiple inline>
          <v-chip
            v-for="(item, i) in categoryMenu"
            :key="i"
            color="primary"
            filter
            :value="item"
            class="ma-1"
          >
            {{ item }}
          </v-chip>
        </v-chip-group>
        <v-spacer></v-spacer>
        <!-- 음료 추가 버튼 -->
        <v-btn
          color="primary"
          @click="fnInsertDrink"
          class="mb-4"
          elevation="2"
        >
          Drink Add
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- 음료 추가 페이지 -->
    <v-dialog
      v-model="isInfoDrink"
      scrollable
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Add Drink</span>
        </v-card-title>
        <v-card-text>
          <DrinkInfo @close="popClose" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 음료 수정 페이지 -->
    <v-dialog
      v-model="isDrinkUp"
      scrollable
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Edit Drink</span>
        </v-card-title>
        <v-card-text>
          <DrinkUp :drinkId="currentDrinkId" @close="popClose" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 음료 목록 -->
    <v-row>
      <v-col
        v-for="item in filteredDrinkList"
        :key="item.DRINKNO"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="350">
          <v-img :src="item.URL" height="200" contain>
            <v-card-title class="white--text">{{
              item.DRINKNAME
            }}</v-card-title>
          </v-img>
          <v-card-subtitle class="text-h6">
            {{ item.CATEGORY }} / {{ item.ISICE }}
          </v-card-subtitle>
          <v-card-text class="text-subtitle-1">
            {{ item.PRICE }}원
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="editDrink(item.DRINKNO)"
              :drinkId="currentDrinkId"
              >수정</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DrinkUp from "./DrinkMenu/DrinkUp.vue";
import DrinkInfo from "./DrinkMenu/DrinkInfo.vue";

export default {
  components: {
    DrinkInfo,
    DrinkUp,
  },
  data() {
    return {
      categoryMenu: ["커피", "티", "에이드", "스무디"],
      selectMenu: [],
      isInfoDrink: false,
      isDrinkUp: false,
      currentDrinkId: null,
      drinkList: [],
    };
  },
  computed: {
    isAllSelected() {
      return this.selectMenu.length === this.categoryMenu.length;
    },
    filteredDrinkList() {
      if (this.selectMenu.length === 0 || this.isAllSelected) {
        return this.drinkList;
      }
      return this.drinkList.filter((drink) =>
        this.selectMenu.includes(drink.CATEGORY)
      );
    },
  },
  methods: {
    popClose() {
      this.isInfoDrink = false;
      this.isDrinkUp = false;
      this.fnGetDrinkList();
    },
    fnInsertDrink() {
      this.isInfoDrink = !this.isInfoDrink;
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.selectMenu = [];
      } else {
        this.selectMenu = [...this.categoryMenu];
      }
    },
    async fnGetDrinkList() {
      try {
        const url = "/drinkList";
        const response = await this.$axios.get(url);
        this.drinkList = response.data;
      } catch (error) {
        console.error("Error fetching drink list", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    editDrink(drinkId) {
      this.isDrinkUp = true;
      this.currentDrinkId = drinkId;
      console.log(drinkId);
    },
  },
  mounted() {
    this.fnGetDrinkList();
  },
};
</script>
