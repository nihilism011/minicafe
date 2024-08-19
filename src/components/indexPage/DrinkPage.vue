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
      <v-col cols="12" class="d-flex flex-wrap">
        <div
          class="DrinkCard"
          v-for="item in filteredDrinkList"
          :key="item.DRINKNO"
          @click="infoDialog(item.DRINKNO)"
        >
          <div class="imgCard">
            <img
              class="imgClass"
              draggable="false"
              :src="item.URL"
              :alt="item.DRINKNAME"
            />
            <v-chip
              :color="item.ISICE == 'ICE' ? 'blue' : 'red'"
              class="isIce"
              >{{ item.ISICE }}</v-chip
            >
          </div>
          <h3 class="nonSelect">{{ item.DRINKNAME }}</h3>
          <div>{{ item.PRICE }}원</div>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isInfoDrink"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <DrinkDialog
        v-if="isInfoDrink"
        :selectDrink="selectDrink"
        @close="popclose"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import DrinkDialog from "./DrinkDialog.vue";
export default {
  components: {
    DrinkDialog,
  },
  data() {
    return {
      categoryMenu: ["커피", "티", "에이드", "스무디"],
      selectMenu: [],
      isClick: false,
      isInfoDrink: false,
      isDrinkUp: false,
      drinkList: [],
      selectDrink: {},
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
    popclose() {
      this.isInfoDrink = false;
    },
    async infoDialog(DRINKNO) {
      const response = await this.$axios("/getDrink?drinkid=" + DRINKNO);
      this.selectDrink = response.data[0];
      console.log(response.data[0]);
      this.isInfoDrink = true;
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
  },
  mounted() {
    this.fnGetDrinkList();
  },
};
</script>
<style>
.isIce {
  position: absolute;
  right: 0;
  bottom: 0;
}
.category {
  position: absolute;
  left: 0;
  top: 0;
}
.nonSelect {
  user-select: none;
  cursor: default;
}
.imgClass {
  width: 250px;
  height: 250px;
}
.imgCard {
  position: relative;
  width: 250px;
  height: 250px;
}
.DrinkCard {
  height: 300px;
  width: 250px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.DrinkCard:hover {
  transform: scale(1.05);
  transition: all 0.3s;
}
</style>
