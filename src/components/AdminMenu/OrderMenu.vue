<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <table>
          <tr>
            <th>유저 ID</th>
            <th>주문 횟수</th>
          </tr>
          <tr
            v-for="(item, index) in orderUser"
            :key="index"
            @click="fnGetOrderUserId(item.userId)"
          >
            <td>{{ item.userId }}</td>
            <td>{{ item.sum }}</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="6">
        <table>
          <tr>
            <th>음료 이름</th>
            <th>주문 횟수</th>
          </tr>
          <tr
            v-for="(item, index) in orderDrink"
            :key="index"
            @click="fnGetDrinkUserId(item.drinkNo)"
          >
            <td>{{ item.drinkName }}</td>
            <td>{{ item.cnt }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog
    v-model="isDialog"
    scrollable
    :overlay="false"
    max-width="1000px"
    transition="dialog-transition"
    @keyup.esc="isDialog = false"
  >
    <v-container v-if="isUserInfo">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row>
                <v-col class="qwer d-flex align-center justify-center" cols="2"
                  >아이디</v-col
                >
                <v-col
                  cols="4"
                  class="qwert d-flex align-center justify-center"
                  >{{ kkkk.USERID }}</v-col
                >
                <v-col class="qwer d-flex align-center justify-center" cols="2"
                  >이름</v-col
                >

                <v-col
                  cols="4"
                  class="qwert d-flex align-center justify-center"
                  >{{ kkkk.USERNAME }}</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex">
                  <v-card v-for="(item, index) in orderUserId" :key="index">
                    <v-img :src="item.URL" height="100" contain />
                    <v-card-text>
                      {{ item.DRINKName }}
                    </v-card-text>
                    <v-card-text> {{ item.cnt }} 회 </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-col
        >
      </v-row>
    </v-container>
    <v-container v-if="isDrinkInfo">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <table>
                    <tr>
                      <th>Drink.No</th>
                      <th>이름</th>
                      <th>HOT/ICE</th>
                    </tr>
                    <tr>
                      <td>{{ rrrr.DRINKNO }}</td>
                      <td>{{ rrrr.DRINKNAME }}</td>
                      <td>{{ rrrr.ISICE }}</td>
                    </tr>
                  </table>
                  <v-card>
                    <v-img height="200" contain :src="rrrr.URL"></v-img>
                  </v-card>
                </v-col>
                <v-col cols="6" class="d-flex">
                  <table>
                    <tr>
                      <th>아이디</th>
                      <th>이름</th>
                      <th>횟수</th>
                    </tr>
                    <tr v-for="(item, index) in orderDrinkId" :key="index">
                      <td>{{ item.userid }}</td>
                      <td>{{ reName(item.USERNAME) }}</td>
                      <td>{{ item.cnt }}</td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-col
        >
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      isDialog: false,
      orderUser: [],
      orderDrink: [],
      orderUserId: [],
      orderDrinkId: [],
      kkkk: {},
      isUserInfo: false,
      isDrinkInfo: false,
      rrrr: {},
    };
  },
  methods: {
    async fnGetOrderUser() {
      const url = "/orderUser";
      const response = await this.$axios.get(url);
      this.orderUser = response.data;
    },
    async fnGetOrderDrink() {
      const url = "/orderDrink";
      const response = await this.$axios.get(url);
      this.orderDrink = response.data;
    },
    async fnGetOrderUserId(userid) {
      const url = `/orderUserId?userid=${userid}`;
      const response = await this.$axios.get(url);
      this.orderUserId = response.data;
      console.log(this.orderUserId[0].URL);

      const urlz = `/userInfo?userid=${userid}`;
      const userResponse = await this.$axios.get(urlz);
      if (userResponse.data && userResponse.data.length > 0) {
        this.kkkk = userResponse.data[0];
      } else {
        this.kkkk = {
          USERID: userid,
          USERNAME: "탈퇴한 사용자 입니다.",
        };
      }
      this.isDialog = true;
      this.isUserInfo = true;
      this.isDrinkInfo = false;
    },
    async fnGetDrinkUserId(drinkNo) {
      const url = `/orderDrinkId?drinkno=${drinkNo}`;
      const response = await this.$axios.get(url);
      this.orderDrinkId = response.data;
      this.isDialog = true;
      this.isDrinkInfo = true;
      this.isUserInfo = false;
      const url2 = `/getDrink?drinkid=${drinkNo}`;
      const responseDr = await this.$axios.get(url2);
      this.rrrr = responseDr.data[0];
    },
    reName(username) {
      if (username) {
        return username;
      } else {
        return "탈퇴한 사용자";
      }
    },
    async userInfo(userid) {
      const url = `/userInfo?userid=${userid}`;
      const response = await this.$axios.get(url);
      console.log(response);
    },
  },
  mounted() {
    this.fnGetOrderUser();
    this.fnGetOrderDrink();
  },
};
</script>
<style scoped>
.qwer {
  border-radius: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 20px;
}
.qwert {
  border-radius: 10px;
  background-color: #21f3790e;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #007bff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr {
  cursor: pointer;
}
</style>
