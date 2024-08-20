<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row>
      <v-col cols="6" class="pr-0 pt-0 pb-0 ma-0 position-relative">
        <v-img
          width="100%"
          src="https://cdn.imweb.me/thumbnail/20220927/9beb857dbe1e9.png"
        />
        <div class="imgText">
          <div>DIRECT</div>
          <div>ROASTING</div>
        </div>
      </v-col>

      <v-col cols="6" class="pl-0 pt-0 pb-0 ma-0 position-relative">
        <v-img
          width="100%"
          src="https://cdn.imweb.me/thumbnail/20220927/6b27af61d5994.png"
        />
        <div class="imgText2">
          <div style="float: right">DIRECT</div>
          <div>BLENDING</div>
        </div>
      </v-col>
    </v-row>
    <v-row style="height: 400px">
      <v-col cols="12" class="d-flex flex-column align-center justify-center">
        <h3>직접 하는 로스팅과 블렌딩</h3>
        <h4>
          Mini 커피는 최상의 커피를 위해 직접 로스팅과 블렌딩을 진행합니다.
        </h4>
        <h4>
          스페셜티 생두의 풍mi를 가장 극대화 할 수 있는 Mini만의 비법을
          사용합니다.
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.imgText {
  position: absolute;
  top: 40%;
  left: 20%;
  color: white;
  font-weight: bolder;
  font-size: 50px;
  cursor: default;
  user-select: none;
}
.imgText2 {
  position: absolute;
  top: 40%;
  right: 20%;
  color: white;
  font-weight: bolder;
  font-size: 50px;
  cursor: default;
  user-select: none;
}
h3 {
  cursor: default;
  user-select: none;
  font-size: 40px;
  margin-bottom: 15px;
}
h4 {
  cursor: default;
  user-select: none;
  font-size: 20px;
}
</style>
