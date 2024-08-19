<template>
  <v-card>
    <v-img :src="selectDrink.URL" height="200px" class="white--text align-end">
      <v-card-title>{{ selectDrink.DRINKNAME }}</v-card-title>
    </v-img>

    <v-card-text>
      <div><strong>Category:</strong> {{ selectDrink.CATEGORY }}</div>
      <div>
        <v-chip :color="selectDrink.ISICE == 'ICE' ? 'blue' : 'red'" dark>
          {{ selectDrink.ISICE }}
        </v-chip>
      </div>
      <div><strong>가격:</strong> {{ selectDrink.PRICE }}원</div>
      <v-divider class="my-3"></v-divider>
      <div>
        <strong>설명:</strong>
        <p>{{ selectDrink.EXPLAN }}</p>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-container>
        <v-row v-if="logInUserId" class="d-felx align-center justify-center">
          <v-spacer></v-spacer>
          <v-icon icon="mdi-minus" @click="countMinus" />
          <div class="countNum">{{ count }}</div>
          <v-icon icon="mdi-plus" @click="countPlus" />
          <v-btn color="primary" @click="fnOrder">주문</v-btn>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="popclose">닫기</v-btn>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selectDrink: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: 1,
      logInUserId: "",
    };
  },
  methods: {
    popclose() {
      this.$emit("close");
    },
    countMinus() {
      if (this.count == 1) {
        return;
      }
      this.count--;
    },
    countPlus() {
      this.count++;
    },
    async fnOrder() {
      if (!confirm("주문하시겠습니까?")) {
        return;
      }
      const userId = sessionStorage.getItem("userId");
      const response = await this.$axios.post("/order", {
        userId: userId,
        count: this.count,
        drinkNo: this.selectDrink.DRINKNO,
      });
      await this.$axios.post("/stamp", { userId: userId, count: this.count });
      alert(response.data.message);
      this.popclose();
    },
  },
  mounted() {
    this.logInUserId = sessionStorage.getItem("userId");
  },
};
</script>

<style scoped>
.countNum {
  display: inline-block;
  width: 20px;
  text-align: center;
  background-color: aliceblue;
}
</style>
