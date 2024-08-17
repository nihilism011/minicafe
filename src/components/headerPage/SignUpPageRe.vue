<template>
  <v-card>
    <v-container>
      <v-row v-for="item in menu" :key="item.label">
        <v-col cols="2">{{ item.name }}</v-col>
        <v-col cols="6">
          <h-input
            :label="item.label"
            v-model="computedModel[item.modelname]"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn>예시</v-btn>
      <v-btn>예시</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        { name: "아이디", label: "id", modelname: "USERID" },
        { name: "비밀번호", label: "password", modelname: "PASSWORD" },
        { name: "비밀번호 확인", label: "password check", modelname: "PCHECK" },
        { name: "이름", label: "name", modelname: "USERNAME" },
        { name: "전화번호", label: "phone", modelname: "PHONENUM" },
        { name: "생일", label: "birth", modelname: "BIRTH" },
      ],
      userinfo: {
        USERID: "",
        PASSWORD: "",
        PCHECK: "",
        USERNAME: "",
        PHONENUM: "",
        BIRTH: "",
      },
    };
  },
  methods: {
    computedModel(modelname) {
      return this.userinfo[modelname];
    },
  },
};
</script>
<style lang=""></style>
