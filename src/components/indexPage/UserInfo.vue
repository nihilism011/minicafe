<template>
  <v-container>
    <v-row>
      <v-col clos="12">
        <v-card>
          <v-card-title>User Info</v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">아이디</v-col>
                <v-col class="subName" cols="8">{{ userInfo.USERID }}</v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">비밀번호</v-col>
                <v-col class="subName" v-if="viewState == 'read'" cols="8">{{
                  userInfo.PASSWORD
                }}</v-col>
                <v-col class="pt-1 pb-1" v-if="viewState == 'update'" cols="8">
                  <input
                    @input="removeSpaces('PASSWORD')"
                    v-model="userInfo.PASSWORD"
                  />
                </v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">이름</v-col>
                <v-col class="subName" v-if="viewState == 'read'" cols="8">{{
                  userInfo.USERNAME
                }}</v-col>
                <v-col class="pt-1 pb-1" v-if="viewState == 'update'" cols="8">
                  <input
                    @input="removeSpaces('USERNAME')"
                    v-model="userInfo.USERNAME"
                  />
                </v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">전화번호</v-col>
                <v-col class="subName" v-if="viewState == 'read'" cols="8">{{
                  userInfo.PHONENUM
                }}</v-col>
                <v-col class="pt-1 pb-1" v-if="viewState == 'update'" cols="8">
                  <input
                    @input="removeNotNum('PHONENUM')"
                    v-model="userInfo.PHONENUM"
                  />
                </v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">생일</v-col>
                <v-col class="subName" cols="8">{{
                  formatDateBirth(userInfo.BIRTH)
                }}</v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">스탬프</v-col>
                <v-col class="subName" cols="8">{{ userInfo.STAMP }}</v-col>
              </v-row>
              <v-row class="align-center earows">
                <v-col class="menuName" cols="4">가입일</v-col>
                <v-col class="subName" cols="8">{{
                  formatDate(userInfo.CREATEDATE)
                }}</v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-col cols="3" v-if="viewState == 'read'"
              ><v-btn color="primary" @click="viewState = 'update'">수정</v-btn>
              <v-btn color="error" @click="fnDeleteUser">탈퇴</v-btn></v-col
            >
            <v-col cols="3" v-if="viewState == 'update'"
              ><v-btn color="success" @click="fnUserUpdate">저장</v-btn></v-col
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      viewState: "read",
    };
  },
  methods: {
    async fnGetUser() {
      if (!sessionStorage.getItem("userId")) {
        return;
      }
      const userid = sessionStorage.getItem("userId");
      const url = `/userInfo?userid=${userid}`;
      const response = await this.$axios.get(url);
      this.userInfo = response.data[0];
      console.log(this.userInfo);
    },
    async fnUserUpdate() {
      if (!confirm("수정하시겠습니까?")) {
        return;
      }
      const url = "/usersUpdate";
      const response = await this.$axios.post(url, this.userInfo);
      alert(response.data.message);
      this.fnGetUser();
      sessionStorage.setItem("userName", this.userInfo.USERNAME);
      this.$emit("kiki");
      this.viewState = "read";
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}년 ${month}월 ${day}일`;
    },
    formatDateBirth(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    removeSpaces(field) {
      // Remove spaces from specific field
      this.userInfo[field] = this.userInfo[field].replace(/\s+/g, "");
    },
    removeNotNum(field) {
      this.userInfo[field] = this.userInfo[field].replace(/\s+/g, "");
      this.userInfo[field] = this.userInfo[field].replace(/\D+/g, "");
    },
    async fnDeleteUser() {
      if (!confirm("정말 탈퇴하시겠습니까?")) {
        return;
      }
      const userid = sessionStorage.getItem("userId");
      const url = "/userDelete";
      const response = await this.$axios.post(url, {
        USERID: userid,
      });
      alert(response.data.message);
      this.$emit("logout");
    },
  },
  mounted() {
    this.fnGetUser();
  },
};
</script>
<style scoped>
input {
  width: 50%; /* 부모 컨테이너의 너비에 맞게 설정 */
  padding: 6px 8px; /* 여백 조정 */
  border: 2px solid #333; /* 기본 테두리 색상 */
  margin: 0;
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 18px; /* 폰트 크기 */
  font-family: "Noto Sans", sans-serif; /* 폰트 변경 */
  color: black; /* 글자 색상 */
  background-color: white; /* 배경 색상 */
  height: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 효과 */
}

input:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 */
  box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.2); /* 포커스 시 그림자 */
  outline: none; /* 기본 포커스 테두리 제거 */
}
.menuName {
  font-size: 20px;
  font-family: "Noto Sans", sans-serif;
}
.subName {
  font-size: 18px;
  font-family: "Noto Sans", sans-serif;
}
.earows {
  border-bottom: 1px solid rgba(0, 0, 0, 0.425);
}
</style>
