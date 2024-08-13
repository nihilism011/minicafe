<template>
  <v-card class="pa-5">
    <v-card-title> Drink Insert </v-card-title>
    <v-row cols="12" md="6">
      <v-text-field
        v-model="inDrink.DRINKNAME"
        label="음료 이름"
      ></v-text-field>
    </v-row>
    <v-row cols="12" md="6">
      <v-text-field v-model="inDrink.EXPLAN" label="음료 설명"></v-text-field>
    </v-row>
    <v-row cols="12" md="6">
      <v-text-field v-model="inDrink.URL" label="이미지 주소"></v-text-field>
    </v-row>
    <v-row cols="12" md="6">
      <v-text-field v-model="inDrink.PRICE" label="가격"></v-text-field>
    </v-row>

    <v-row cols="12" md="6">
      <v-card-text>카테고리</v-card-text>
    </v-row>
    <v-row>
      <v-radio-group v-model="inDrink.CATEGORY" inline>
        <v-radio
          v-for="(item, i) in CATEGORY"
          :key="i"
          color="primary"
          :label="item"
          :value="item"
        />
      </v-radio-group>
    </v-row>

    <v-row cols="12" md="6">
      <v-card-text>HOT or ICE</v-card-text>
    </v-row>
    <v-row>
      <v-radio-group v-model="inDrink.ISICE" inline>
        <v-radio color="red" label="HOT" value="HOT"></v-radio>
        <v-radio color="blue" label="ICE" value="ICE"></v-radio>
      </v-radio-group>
    </v-row>
    <v-container>
      <v-row>
        <v-btn @click="updateDrink">수정</v-btn>
        <v-btn @click="deleteUser">삭제</v-btn>
        <v-btn @click="closeCard">닫기</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: {
    drinkId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      CATEGORY: ["커피", "티", "에이드", "스무디"],
      inDrink: {
        DRINKNAME: "",
        EXPLAN: "",
        URL: "",
        CATEGORY: "",
        PRICE: 0,
        ISICE: "",
      },
    };
  },
  methods: {
    closeCard() {
      this.$emit("close");
    },
    validateAndTrimDrinkInfo() {
      // Trim spaces and check if any field is empty
      Object.keys(this.inDrink).forEach((key) => {
        if (typeof this.inDrink[key] === "string") {
          // Remove spaces and update the original inDrink object
          this.inDrink[key] = this.inDrink[key].trim();
        }
      });

      // Check if any required field is empty after trimming
      if (!this.inDrink.DRINKNAME) {
        alert("음료 이름을 입력하세요.");
        return false;
      }
      if (!this.inDrink.EXPLAN) {
        alert("음료 설명을 입력하세요.");
        return false;
      }
      if (!this.inDrink.CATEGORY) {
        alert("카테고리를 선택하세요.");
        return false;
      }
      if (!this.inDrink.PRICE || isNaN(this.inDrink.PRICE)) {
        alert("가격을 올바르게 입력하세요. 숫자만 입력할 수 있습니다.");
        return false;
      }
      if (!this.inDrink.ISICE) {
        alert("HOT 또는 ICE를 선택하세요.");
        return false;
      }

      // Validate URL
      const urlPattern = /\.(jpeg|jpg|gif|png)$/;
      if (!urlPattern.test(this.inDrink.URL)) {
        alert("올바른 이미지 URL을 입력하세요. 기본 이미지로 설정됩니다.");
        this.inDrink.URL =
          "https://cdn.pixabay.com/photo/2020/04/06/13/37/coffee-5009730_960_720.png";
        return false;
      }

      return true;
    },

    async updateDrink() {
      // Validate the drink info before making the request
      if (!this.validateAndTrimDrinkInfo()) {
        return; // Stop if validation fails
      }

      try {
        const url = `http://localhost:3000/drinkUp`;
        const response = await axios.post(url, this.inDrink);
        alert(response.data.message);
        this.closeCard();
      } catch (error) {
        console.error("Error updating drink info", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    async drinkSet() {
      try {
        const url = `http://localhost:3000/drinkSet?drinkno=${this.drinkId}`;
        const response = await axios.get(url);
        this.inDrink = response.data[0];
        console.log(this.inDrink);
      } catch (error) {
        console.error("Error fetching user list", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
  mounted() {
    this.drinkSet();
  },
};
</script>
