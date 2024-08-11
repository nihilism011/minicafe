<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Birth</th>
          <th>Create Date</th>
          <th>STAMP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userList" :key="item.userid">
          <td>{{ index + 1 }}</td>
          <td>{{ item.USERID }}</td>
          <td>{{ item.USERNAME }}</td>
          <td>{{ item.PHONENUM }}</td>
          <td>{{ item.BIRTH.replace(/T.+/, "") }}</td>
          <td>{{ item.CREATEDATE.replace(/T.+/, "") }}</td>
          <td>{{ item.STAMP }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderbymenu: "CREATEDATE",
      orderbyType: "ASC",
      nameKeyword: "",
      userList: [],
    };
  },
  methods: {
    async fnGetUserList() {
      try {
        const url = `http://localhost:3000/userList?keyword=${this.nameKeyword}&odr=${this.orderbymenu}&odrt=${this.orderbyType}`;
        const response = await axios.get(url);
        this.userList = response.data;
        console.log(url);
      } catch (error) {
        console.error("Error fetching user list", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
  mounted() {
    this.fnGetUserList();
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
