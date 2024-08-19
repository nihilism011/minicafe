<template>
  <v-container>
    <v-row>
      <v-col clos="6">
        <v-text-field
          type="text"
          placeholder="아이디"
          label="아이디"
          v-model="userId"
          outlined
          color
        ></v-text-field>
        <v-text-field
          type="text"
          placeholder="비밀번호"
          label="비밀번호"
          v-model="userPassword"
          outlined
          color
        ></v-text-field>
        <v-text-field
          type="text"
          placeholder="이름"
          label="이름"
          v-model="userName"
          outlined
          color
        ></v-text-field>
        <v-text-field
          type="text"
          placeholder="전화번호"
          label="전화번호"
          v-model="userPhone"
          outlined
          color
        ></v-text-field>
        <v-text-field
          type="text"
          placeholder="생일"
          label="생일"
          v-model="userBirth"
          outlined
          color
        ></v-text-field>
        <v-text-field
          type="text"
          placeholder="스탬프"
          label="스탬프"
          v-model="userStamp"
          outlined
          color
        ></v-text-field>
        <v-btn color="primary">수정</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      userPassword: "",
      userName: "",
      userPhone: "",
      userBirth: "",
      userStamp: "",
    };
  },
  methods: {
    fnGetUser() {},
  },
};
</script>
<style></style>
