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
      </v-card-actions>
    </v-card>

    <!-- 음료 목록 -->
    <v-row>
      <v-col class="d-flex"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      categoryMenu: ["커피", "티", "에이드", "스무디"],
      selectMenu: [],
      isInfoDrink: false,
      isDrinkUp: false,
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
  },
  mounted() {
    this.fnGetDrinkList();
  },
};
</script>
