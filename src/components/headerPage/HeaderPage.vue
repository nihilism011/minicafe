<template>
  <v-container fluid max-width=" 100%" class="mb-5">
    <v-row>
      <v-col cols="2" class="pa-0">
        <v-img
          draggable="false"
          src="../../assets/cafeLogo.png"
          height="100px"
        ></v-img>
      </v-col>
      <v-col colss="7" class="pa-0">
        <v-container>
          <v-row>
            <v-col class="pa-0">
              <h1 class="title">Cafe Mini</h1>
            </v-col>
          </v-row>
          <v-row class="customFont">
            <v-col cols="2" class="menus" @click="$router.push('/MainPage')">
              카페 소개
            </v-col>
            <v-col cols="2" class="menus" @click="$router.push('/DrinkPage')">
              음료
            </v-col>
            <v-col cols="2" class="menus" @click="$router.push('/ReviewPage')">
              리뷰
            </v-col>
            <v-col
              v-if="logInfo.userStatus == 'admin'"
              cols="2"
              class="pa-0 ma-0 admin d-flex align-center justify-center"
              @click="$router.push('/AdminPage')"
              >관리자 페이지</v-col
            >
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="3" class="d-flex align-center justify-center pa-0">
        <div class="wel customFont" v-if="logInfo.userId">
          {{ logInfo.userName }} 님 환영합니다.
        </div>
        <v-btn
          style="color: #2196f3"
          class="customBtn"
          v-if="logInfo.userId"
          @click="$router.push('/userinfopage')"
          >User Info
        </v-btn>
        <v-btn
          v-if="logInfo.userId"
          @click="fnLogOut"
          class="customBtn"
          style="color: #ff5252"
          >Log Out
        </v-btn>
        <v-btn
          v-if="!logInfo.userId"
          @click="isDialog = true"
          class="customBtn"
          style="color: #2196f3"
          >Log in</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
    v-model="isDialog"
    scrollable
    :overlay="false"
    max-width="1000px"
    transition="dialog-transition"
    persistent
    @keyup.esc="isDialog = false"
  >
    <LogInPage @close="isDialog = false" @logOn="fnLogOn" />
  </v-dialog>
</template>

<script>
import LogInPage from "./LogInPage.vue";
export default {
  components: {
    LogInPage,
  },
  data: () => ({
    isDialog: false,
    logInfo: { userId: "", userName: "", userStatus: "" },
  }),
  methods: {
    fnLogOut() {
      if (!confirm("로그아웃 하시겠습니까????")) {
        return;
      }
      sessionStorage.clear();
      this.fnLogOn();
      this.$router.push("/MainPage");
    },
    fnLogOn() {
      this.logInfo.userId = sessionStorage.getItem("userId");
      this.logInfo.userName = sessionStorage.getItem("userName");
      this.logInfo.userStatus = sessionStorage.getItem("userStatus");
    },
    logchk() {
      console.log(sessionStorage.getItem("userId"));
    },
  },
  mounted() {
    this.fnLogOn();
  },
};
</script>

<style scoped lagn="scss">
.customBtn {
  box-shadow: none;
  font-weight: bold;
  font-size: large;
}
.customFont {
  font-size: large;
  font-weight: 600;
  font-family: "Open Sans", "Noto Sans KR", "Apple SD 산돌고딕 Neo",
    "Apple SD Gothic Neo", "나눔고딕", NanumGothic, ng, sans-serif !important;
}
.wel {
  position: absolute;
  top: 5px;
}
.admin {
  cursor: pointer;
  color: red;
  font-weight: bold;
  transition: all 0.4s;
  border-radius: 10px;
  padding: 0;
  margin: 0;
}
.admin:hover {
  background-color: rgba(255, 0, 0, 0.065);
}
.menus {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  transition: all 0.5s;
}
.menus:hover {
  background-color: #2195f328;
}
.title {
  cursor: default;
  user-select: none;
}
</style>
