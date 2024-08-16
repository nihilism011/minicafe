<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="elevation-6">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="6">
                  <v-card-text class="mt-12">
                    <h1 class="text-center">Log In</h1>
                    <h4 class="text-center grey--text">
                      Cafe Mini에 오신것을 환영합니다.
                    </h4>
                    <v-row align="center" justify="center">
                      <v-col cols="12">
                        <v-text-field
                          label="Id"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          v-model="userId"
                          @input="removeSpacesver2('userId')"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="pwd"
                          @input="removeSpacesver2('pwd')"
                        />
                        <v-row align-content-end>
                          <v-spacer></v-spacer>
                          <v-col cols="12" class="d-flex justify-end">
                            <span style="color: #2196f3"
                              >비밀번호를 잊으셨나요?
                            </span>
                          </v-col>
                        </v-row>
                        <v-btn
                          style="font-size: 20px"
                          size="50px"
                          color="blue"
                          block
                          tile
                          >Log in</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="6" class="bg-blue">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">
                        아직 Mini Cafe의 회원이 아니신가요?
                      </h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn style="color: #2196f3" @click="step++"
                        >SIGN UP</v-btn
                      >
                    </div>
                    <div class="text-center mt-3">
                      <v-btn style="color: #f44336" @click="popclose"
                        >Close</v-btn
                      >
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="6" class="bg-blue">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">
                        이미 Mini Cafe의 회원이신가요?
                      </h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn style="color: #2196f3" @click="step--"
                        >Log in</v-btn
                      >
                    </div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <v-card-text class="mt-8">
                    <h1 class="text-center">Sign up</h1>
                    <h4 class="text-center grey--text">
                      Cafe Mini에 오신것을 환영합니다.
                    </h4>
                    <v-row align="center" justify="center" class="mt-5">
                      <v-col cols="12">
                        <v-text-field
                          label="Id"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-4"
                          v-model="users.USERID"
                          @input="fnIdcheck('USERID')"
                          ><h5 class="red" v-show="idmsg == 'red'">
                            중복된 아이디 입니다.
                          </h5>
                          <h5 v-show="idmsg == 'blue'" class="blue">
                            사용 가능한 아이디 입니다.
                          </h5>
                          <h5 v-show="idmsg == 'purple'" class="purple">
                            아이디는 5자 이상,20자 이하로 작성해주세요.
                          </h5>
                        </v-text-field>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Password"
                              outlined
                              dense
                              color="blue"
                              type="password"
                              autocomplete="false"
                              v-model="users.PASSWORD"
                              @change="fnPwdCheck"
                              @input="removeSpaces('PASSWORD')"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Password Check"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              type="password"
                              v-model="PASSWORDCHECK"
                              @change="fnPwdCheck"
                            >
                              <h5 class="red" v-show="pwmsg == 'red'">
                                비밀번호가 다릅니다.
                              </h5>
                              <h5 v-show="pwmsg == 'blue'" class="blue">
                                비밀번호가 일치합니다.
                              </h5>
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="Name"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          @change="fnNameCheck"
                          @input="removeSpaces('USERNAME')"
                          v-model="users.USERNAME"
                        >
                          <h5 class="red" v-show="namemsg == 'red'">
                            이름은 2자 이상 입력해주세요.
                          </h5>
                          <h5 class="red" v-show="namemsg == 'purple'">
                            이름은 20자 이하 입력해주세요.
                          </h5>
                          <h5 v-show="namemsg == 'blue'" class="blue">
                            check!
                          </h5>
                        </v-text-field>
                        <v-text-field
                          label="Phone"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="users.PHONENUM"
                          @input="fnDoublecheck('PHONENUM')"
                        />
                        <dateSelect v-model="users.BIRTH" />
                        <v-row>
                          <v-col cols="12">
                            <v-checkbox
                              label="약관에 동의합니다."
                              class="mt-n1"
                              color="blue"
                              v-model="agree"
                            >
                            </v-checkbox>
                          </v-col>
                        </v-row>
                        <v-btn
                          style="font-size: 20px"
                          size="50px"
                          color="blue"
                          block
                          tile
                          @click="fnSignup"
                          >Sign up</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dateSelect from "../h-components/dateSelect.vue";
export default {
  name: "signIN",
  components: {
    dateSelect,
  },
  data: () => ({
    namemsg: "",
    pwmsg: "",
    idmsg: "",
    step: 1,
    userId: "",
    pwd: "",
    agree: false,
    PASSWORDCHECK: "",
    users: {
      USERID: "",
      PASSWORD: "",
      USERNAME: "",
      PHONENUM: "",
      BIRTH: "",
    },
  }),
  props: {
    source: String,
  },
  methods: {
    popclose() {
      this.$emit('close');
    },
    fnDoublecheck(field) {
      this.removeSpaces(field);
      this.removeNotNum(field);
    },
    fnNameCheck() {
      if (this.users.USERNAME.length < 2) {
        this.namemsg = "red";
        return;
      }
      if (this.users.USERNAME.length > 20) {
        this.namemsg = "purple";
        return;
      }
      this.namemsg = "blue";
    },
    async fnIdcheck(id) {
      this.removeSpaces(id);
      const userid = this.users[id];
      if (userid.length < 5 || userid.length > 20) {
        this.idmsg = "purple";
        return;
      }
      const response = await this.$axios.get(`/idCheck?id=${userid}`);
      if (response.data) {
        this.idmsg = "blue";
      } else {
        this.idmsg = "red";
      }
    },
    fnPwdCheck() {
      if (!this.PASSWORDCHECK) {
        this.pwmsg = "";
        return;
      }
      if (this.users.PASSWORD != this.PASSWORDCHECK) {
        this.pwmsg = "red";
      } else {
        this.pwmsg = "blue";
      }
    },
    removeSpaces(field) {
      // Remove spaces from specific field
      this.users[field] = this.users[field].replace(/\s+/g, "");
    },
    removeSpacesver2(field) {
      this[field] = this[field].replace(/\s+/g, "");
    },
    removeNotNum(field) {
      this.users[field] = this.users[field].replace(/\D+/g, "");
    },
    async fnSignup() {
      if (this.idmsg != "blue") {
        alert("아이디를 확인해주세요.");
        return;
      }
      if (this.pwmsg != "blue") {
        alert("비밀번호를 확인해주세요.");
        return;
      }
      if (this.namemsg != "blue") {
        alert("이름을 확인해주세요.");
        return;
      }
      if (!this.users.PHONENUM) {
        alert("전화번호를 입력해주세요. 대충 입력하세요.");
        return;
      }
      if (!this.users.BIRTH) {
        alert("생년월일을 입력해주세요.");
      }
      if (!this.agree) {
        alert("약관에 동의해주세요");
      }

      console.log(this.users);
      const response = await this.$axios.post("/userInsert", this.users);
      alert(response.data.message);
      this.step--;
    },
  },
  watch: {},
};
</script>
<style scoped>
h5 {
  position: absolute;
  right: 0px;
  top: -20px;
  user-select: none;
}
.red {
  color: #f44336;
}
.blue {
  color: #2196f3;
}
.purple {
  color: #673ab7;
}
</style>
