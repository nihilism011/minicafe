<template>
  <v-card class="pa-4">
    <v-card-title> Drink Insert </v-card-title>
    <v-card-subtitle class="pb-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.DRINKNAME"
            label="음료 이름"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.EXPLAN"
            label="음료 설명"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.URL"
            label="이미지 주소"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.CATEGORY"
            label="음료 카테고리"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.PRICE"
            label="가격"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="inDrink.ISICE"
            label="HOT or ICE"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-container>
      <v-row>
        <v-btn @click="updateUser">수정</v-btn>
        <v-btn @click="deleteUser">삭제</v-btn>
        <v-btn @click="closeCard">닫기</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
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
};
</script>
