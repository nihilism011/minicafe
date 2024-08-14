<template>
  <v-card class="pa-4">
    <v-card-title> User Information </v-card-title>
    <v-card-item class="pb-4">
      <v-row>
        <v-col cols="6" class="mt-4">
          <v-textarea
            v-model="users.USERID"
            label="User ID"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            disabled
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-4">
          <v-textarea
            v-model="users.PASSWORD"
            label="Password"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.USERNAME"
            label="User Name"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.PHONENUM"
            label="Phone Number"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.BIRTH.split('T')[0]"
            label="Birth"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            disabled
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.CREATEDATE.split('T')[0]"
            label="Create Date"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            disabled
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.STATUS"
            label="Status"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>

        <v-col cols="6" class="mt-1">
          <v-textarea
            v-model="users.STAMP"
            label="Stamp"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="updateUser" color="primary" class="mx-2">Update</v-btn>
      <v-btn @click="deleteUser" color="error" class="mx-2">Delete</v-btn>
      <v-btn @click="closeCard" color="secondary" class="mx-2">Close</v-btn>
    </v-card-actions>
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
