<template>
  <v-card class="pa-4">
    <v-icon
      color="primary"
      class="closebtn"
      icon="mdi-close-box-outline"
      @click="closeCard"
    />
    <v-card-title primary-title> Sign Up </v-card-title>
    <v-container>
      <v-text-field
        v-model="users.USERID"
        label="Id"
        @input="removeSpaces('USERID')"
      ></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field
            type="password"
            v-model="users.PASSWORD"
            label="Password"
            @input="removeSpaces('PASSWORD')"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            type="password"
            v-model="pwdCheck"
            label="Password Check"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field
        v-model="users.USERNAME"
        label="Name"
        @input="removeSpaces('USERNAME')"
      ></v-text-field>
      <v-text-field
        v-model="users.PHONENUM"
        label="PhoneNum"
        @input="removeSpaces('PHONENUM')"
      ></v-text-field>

      <v-text-field v-model="users.BIRTH" readonly label="BIRTH">
        <v-icon icon="$calendar" @click="isdatepicker = !isdatepicker"></v-icon>
      </v-text-field>
      <v-date-picker
        class="datepicker"
        v-if="isdatepicker"
        v-model="bDate"
      ></v-date-picker>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="insertUser">submit</v-btn>
      <v-btn color="error" @click="closeCard">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      users: {
        USERID: "",
        PASSWORD: "",
        USERNAME: "",
        PHONENUM: "",
        BIRTH: new Date(),
      },
      bDate: new Date(),
      pwdCheck: "",
      isdatepicker: false,
    };
  },
  watch: {
    bDate(newDate) {
      this.users.BIRTH = this.formatDate(newDate);
      this.isdatepicker = false;
    },
  },
  methods: {
    removeSpaces(field) {
      // Remove spaces from specific field
      this.users[field] = this.users[field].replace(/\s+/g, "");
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    closeCard() {
      this.$emit("close"); // 이벤트를 부모 컴포넌트로 전달
    },
    async insertUser() {
      console.log(this.users);
      const response = await this.$axios.post("/userInsert", this.users);
      alert(response.data.message);
      this.closeCard();
    },
  },
  mounted() {
    // 처음 로드될 때 BIRTH를 포맷팅
    this.users.BIRTH = this.formatDate(this.users.BIRTH);
  },
};
</script>

<style scoped>
.datepicker {
  position: fixed;
  top: 50px;
  left: 0px;
}
.closebtn {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
