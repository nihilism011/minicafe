<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="nameKeyword"
          label="User name"
          @keyup.enter="search"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="search" color="primary">Search</v-btn>
      </v-col>
    </v-row>

    <v-table class="elevation-1">
      <thead>
        <tr>
          <th>No.</th>
          <th
            @click="sortBy('USERID')"
            :class="{ 'sorted-column': orderbymenu === 'USERID' }"
          >
            User ID
            <v-icon v-if="orderbymenu === 'USERID'">
              {{ orderbyType === "ASC" ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
          </th>
          <th
            @click="sortBy('USERNAME')"
            :class="{ 'sorted-column': orderbymenu === 'USERNAME' }"
          >
            User Name
            <v-icon v-if="orderbymenu === 'USERNAME'">
              {{ orderbyType === "ASC" ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
          </th>
          <th>PHONENUM</th>
          <th
            @click="sortBy('BIRTH')"
            :class="{ 'sorted-column': orderbymenu === 'BIRTH' }"
          >
            Birth
            <v-icon v-if="orderbymenu === 'BIRTH'">
              {{ orderbyType === "ASC" ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
          </th>
          <th
            @click="sortBy('CREATEDATE')"
            :class="{ 'sorted-column': orderbymenu === 'CREATEDATE' }"
          >
            Create Date
            <v-icon v-if="orderbymenu === 'CREATEDATE'">
              {{ orderbyType === "ASC" ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
          </th>
          <th
            @click="sortBy('STAMP')"
            :class="{ 'sorted-column': orderbymenu === 'STAMP' }"
          >
            STAMP
            <v-icon v-if="orderbymenu === 'STAMP'">
              {{ orderbyType === "ASC" ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in userList"
          :key="item.USERID"
          @click="fnUserInfo(item.USERID)"
        >
          <td>{{ index + 1 + (pageNum - 1) * pageLimit }}</td>
          <td>{{ item.USERID }}</td>
          <td>{{ item.USERNAME }}</td>
          <td>{{ item.PHONENUM }}</td>
          <td>{{ item.BIRTH.split("T")[0] }}</td>
          <td>{{ item.CREATEDATE.split("T")[0] }}</td>
          <td>{{ item.STAMP }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      :length="userCNT"
      v-model="pageNum"
      @input="fnGetUserList"
    ></v-pagination>
  </v-container>
  <v-dialog
    v-model="isInfoUser"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <UserInfo v-if="isInfoUser" :infoUser="infoUser" @close="popclose" />
  </v-dialog>
</template>

<script>
import axios from "axios";
import UserInfo from "./userInfo.vue";
export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      nameKeyword: "",
      userList: [],
      infoUser: {},
      userCNT: 0,
      pageNum: 1,
      pageLimit: 10,
      orderbymenu: "CREATEDATE",
      orderbyType: "ASC",
      isInfoUser: false,
    };
  },
  methods: {
    popclose() {
      this.isInfoUser = false;
      this.fnGetUserList();
    },
    async fnGetUserList() {
      try {
        const url =
          `http://localhost:3000/userList?keyword=${this.nameKeyword}&` +
          `odr=${this.orderbymenu}&` +
          `odrt=${this.orderbyType}&` +
          `page=${this.pageNum}&limit=${this.pageLimit}`;
        const url2 = `http://localhost:3000/userListCNT?keyword=${this.nameKeyword}`;

        // 두 요청을 병렬로 처리
        const [response, response2] = await Promise.all([
          axios.get(url),
          axios.get(url2),
        ]);
        console.log(url);
        this.userList = response.data;
        const listCnt = response2.data[0].CNT;
        this.userCNT = Math.ceil(listCnt / this.pageLimit);
      } catch (error) {
        console.error("Error fetching user list", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    async fnUserInfo(userId) {
      try {
        const url = `http://localhost:3000/userInfo?userid=${userId}`;

        const response = await axios.get(url);

        this.infoUser = response.data[0];

        this.isInfoUser = true;
      } catch (error) {
        console.error("Error fetching user info", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    search() {
      this.pageNum = 1; // 검색 시 페이지 번호를 1로 초기화
      this.fnGetUserList();
    },
    sortBy(column) {
      if (this.orderbymenu === column) {
        this.orderbyType = this.orderbyType === "ASC" ? "DESC" : "ASC";
      } else {
        this.orderbymenu = column;
        this.orderbyType = "ASC";
      }
      this.fnGetUserList();
    },
  },
  watch: {
    pageNum() {
      this.fnGetUserList();
    },
  },
  mounted() {
    this.fnGetUserList();
  },
};
</script>

<style scoped>
.sorted-column {
  background-color: #f5f5f5; /* 현재 정렬된 컬럼에 대해 백그라운드 색상 변경 */
}
</style>
