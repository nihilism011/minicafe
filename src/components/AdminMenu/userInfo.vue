<template>
  <v-card class="pa-4">
    <v-card-title> User Information </v-card-title>
    <v-card-subtitle class="pb-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.USERID"
            label="User ID"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.PASSWORD"
            label="Password"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.USERNAME"
            label="User Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.PHONENUM"
            label="Phone Number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.BIRTH.split('T')[0]"
            label="Birth"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="users.CREATEDATE.split('T')[0]"
            label="Create Date"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="users.STATUS" label="Status"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="users.STAMP" label="Stamp"></v-text-field>
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
import axios from "axios";

export default {
  props: {
    infoUser: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      users: this.infoUser,
    };
  },
  methods: {
    async deleteUser() {
      if (!confirm("정말로 회원을 삭제하시겠습니까?")) {
        return;
      }
      try {
        const url = `http://localhost:3000/userDelete`;
        const deleteUser = {
          USERID: this.users.USERID,
        };
        const response = await axios.post(url, deleteUser);
        alert(response.data.message);
        this.closeCard();
      } catch (error) {
        console.error("Error fetching user info", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    closeCard() {
      this.$emit("close"); // 이벤트를 부모 컴포넌트로 전달
    },
    async updateUser() {
      const { PASSWORD, USERNAME, PHONENUM, STATUS, STAMP } = this.users;
      var { BIRTH } = this.users;
      // 모든 필드를 문자열로 변환한 뒤에 trim() 적용
      if (
        !String(PASSWORD).trim() ||
        !String(USERNAME).trim() ||
        !String(PHONENUM).trim() ||
        !String(BIRTH).trim() ||
        !String(STATUS).trim() ||
        !String(STAMP).trim()
      ) {
        alert("빈 칸 없이 모든 정보를 입력 해 주세요.");
        return;
      }
      BIRTH = BIRTH.split("T")[0];
      console.log(BIRTH);
      // BIRTH 필드가 MySQL DATE 형식과 일치하는지 확인 (YYYY-MM-DD 형식)
      const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!birthDateRegex.test(BIRTH)) {
        alert("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
        return;
      }
      if (!confirm("정말로 회원정보를 수정하시겠습니까?")) {
        return;
      }
      try {
        const url = `http://localhost:3000/userUpdate`;
        const setUser = {
          USERID: this.users.USERID,
          PASSWORD: String(PASSWORD).trim(),
          USERNAME: String(USERNAME).trim(),
          PHONENUM: String(PHONENUM).trim(),
          BIRTH: String(BIRTH).trim(),
          STATUS: String(STATUS).trim(),
          STAMP: String(STAMP).trim(),
          CREATEDATE: this.users.CREATEDATE,
        };
        const response = await axios.post(url, setUser);
        alert(response.data.message);
        this.closeCard();
      } catch (error) {
        console.error("Error fetching user info", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
};
</script>

<style scoped></style>
