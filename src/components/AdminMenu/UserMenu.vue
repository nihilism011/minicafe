<template>
  <div>
    <v-text-field
      v-model="nameKeyword"
      label="User name search"
      @keyup.enter="search"
      append-outer-icon="mdi-magnify"
      @click:append-outer="search"
    ></v-text-field>
    <v-table class="elevation-1 fixed-table">
      <thead>
        <tr>
          <th class="column-no">No.</th>
          <th
            @click="sortBy('USERID')"
            :class="{
              'sorted-column': orderbymenu === 'USERID',
              'column-userid': true,
            }"
          >
            ID
            <v-icon v-if="orderbymenu === 'USERID'">
              {{
                orderbyType === "ASC" ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </th>
          <th
            @click="sortBy('USERNAME')"
            :class="{
              'sorted-column': orderbymenu === 'USERNAME',
              'column-username': true,
            }"
          >
            이름
            <v-icon v-if="orderbymenu === 'USERNAME'">
              {{
                orderbyType === "ASC" ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </th>
          <th class="column-phonenumber">Phone Number</th>
          <th
            @click="sortBy('BIRTH')"
            :class="{
              'sorted-column': orderbymenu === 'BIRTH',
              'column-birth': true,
            }"
          >
            생일
            <v-icon v-if="orderbymenu === 'BIRTH'">
              {{
                orderbyType === "ASC" ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </th>
          <th
            @click="sortBy('CREATEDATE')"
            :class="{
              'sorted-column': orderbymenu === 'CREATEDATE',
              'column-createdate': true,
            }"
          >
            가입일
            <v-icon v-if="orderbymenu === 'CREATEDATE'">
              {{
                orderbyType === "ASC" ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </th>
          <th
            @click="sortBy('STAMP')"
            :class="{
              'sorted-column': orderbymenu === 'STAMP',
              'column-stamp': true,
            }"
          >
            Stamp
            <v-icon v-if="orderbymenu === 'STAMP'">
              {{
                orderbyType === "ASC" ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </th>
          <th class="column-actions">
            <v-icon icon="mdi-update" /><v-icon icon="mdi-delete" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in userList"
          :key="item.USERID"
          :class="
            item.STATUS == 'admin'
              ? 'blue'
              : item.STATUS == 'banuser'
              ? 'red'
              : 'nomal'
          "
        >
          <td>{{ index + 1 + (pageNum - 1) * pageLimit }}</td>
          <td>{{ item.USERID }}</td>
          <td>{{ item.USERNAME }}</td>
          <td>{{ item.PHONENUM }}</td>
          <td>{{ item.BIRTH.split("T")[0] }}</td>
          <td>{{ item.CREATEDATE.split("T")[0] }}</td>
          <td>{{ item.STAMP }}</td>
          <td>
            <v-btn @click="fnUserInfo(item.USERID)" color="primary"
              >View Info</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      :length="userCNT"
      v-model="pageNum"
      @input="fnGetUserList"
    ></v-pagination>
    <v-dialog
      v-model="isInfoUser"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <UserInfo v-if="isInfoUser" :infoUser="infoUser" @close="popclose" />
    </v-dialog>
  </div>
</template>

<script>
import UserInfo from "./UeerMenu/userInfo.vue";

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
      const url = `/userList`;
      const url2 = `/userListCNT`;

      const params = {
        keyword: this.nameKeyword,
        odr: this.orderbymenu,
        odrt: this.orderbyType,
        page: this.pageNum,
        limit: this.pageLimit,
      };

      const [response, response2] = await Promise.all([
        this.$axios.get(url, { params }),
        this.$axios.get(url2, { params: { keyword: this.nameKeyword } }),
      ]);

      this.userList = response.data;
      const listCnt = response2.data[0].CNT;
      this.userCNT = Math.ceil(listCnt / this.pageLimit);
    },

    async fnUserInfo(userId) {
      const url = `/userInfo?userid=${userId}`;
      const response = await this.$axios.get(url);
      this.infoUser = response.data[0];
      this.isInfoUser = true;
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
.fixed-table {
  table-layout: fixed; /* 테이블의 레이아웃을 고정하여 열 너비가 변경되지 않도록 함 */
  width: 100%; /* 테이블 너비를 100%로 설정하여 부모 컨테이너에 맞춤 */
  border-collapse: separate;
  border-spacing: 0 8px;
}
.fixed-table th,
.fixed-table td {
  padding: 12px 16px; /* 셀 패딩을 추가하여 공간을 확보 */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  vertical-align: middle; /* 텍스트를 중간 정렬 */
  border-bottom: 1px solid #ddd; /* 셀 하단에 얇은 테두리 추가 */
}

.fixed-table tbody tr {
  transition: background-color 0.3s ease; /* 행 배경색 변화에 대한 애니메이션 추가 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 행에 살짝 그림자 추가 */
}

.column-no {
  width: 50px; /* No. 열의 고정 너비 */
}

.column-userid {
  width: 150px; /* User ID 열의 고정 너비 */
}

.column-username {
  width: 170px; /* User Name 열의 고정 너비 */
}

.column-phonenumber {
  width: 150px; /* Phone Number 열의 고정 너비 */
}

.column-birth {
  width: 150px; /* Birth 열의 고정 너비 */
}

.column-createdate {
  width: 150px; /* Create Date 열의 고정 너비 */
}

.column-stamp {
  width: 120px; /* Stamp 열의 고정 너비 */
}

.column-actions {
  width: 120px; /* Actions 열의 고정 너비 */
  text-align: center;
}

.sorted-column {
  background-color: #2195f31f; /* 현재 정렬된 컬럼에 대해 백그라운드 색상 변경 */
}
.blue {
  background-color: #e3f2fd;
}
.blue:hover {
  background-color: #cee8fa;
}
.nomal {
  background-color: #ffffff;
}
.nomal:hover {
  background-color: #f0f8ff;
}
.red {
  background-color: #ffebee;
}
.red:hover {
  background-color: #ffb0c4;
}
</style>
