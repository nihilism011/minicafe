<!-- ChildComponent.vue -->
<template>
  <div class="input-container">
    <input
      type="text"
      class="text-input"
      :style="istyle"
      :value="modelValue"
      @input="onInput"
      @change="onChange"
      placeholder=""
    />
    <label class="floating-label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String, // v-model에서 사용할 prop 이름
    label: String, // 부모 컴포넌트에서 라벨을 전달받는 prop
    istyle: String,
  },
  emits: ["update:modelValue", "change"], // 이벤트 등록
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value); // v-model 업데이트
      this.$emit("input", event.target.value); // 추가로 input 이벤트 발생
    },
    onChange(event) {
      this.$emit("change", event.target.value); // change 이벤트 발생
    },
  },
};
</script>

<style scoped lang="scss">
.input-container {
  position: relative;
  width: 250px; /* 적절한 너비 설정 */
}

.text-input {
  width: 100%; /* 부모 컨테이너의 너비에 맞게 설정 */
  padding: 6px 8px; /* 여백 조정 */
  border: 2px solid #333; /* 기본 테두리 색상 */
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 18px; /* 폰트 크기 */
  font-family: "Noto Sans", sans-serif; /* 폰트 변경 */
  color: black; /* 글자 색상 */
  background-color: white; /* 배경 색상 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 효과 */
}

.text-input:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 */
  box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.2); /* 포커스 시 그림자 */
  outline: none; /* 기본 포커스 테두리 제거 */
}

.floating-label {
  position: absolute;
  top: 50%; /* 기본 위치 */
  left: 10px; /* 왼쪽 여백 */
  font-size: 18px; /* 기본 폰트 크기 */
  color: #3333338b; /* 기본 글자 색상 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  transform: translateY(-50%); /* 중앙 정렬 */
  pointer-events: none; /* 클릭 방지 */
  z-index: 1; /* 입력 필드 위에 표시 */
}

.text-input:focus + .floating-label,
.text-input:not(:placeholder-shown) + .floating-label {
  top: -6px; /* 라벨이 위로 이동 */
  left: 8px; /* 왼쪽 여백 조정 */
  font-size: 14px; /* 폰트 크기 줄임 */
  color: #007bff; /* 포커스 시 글자 색상 */
}
</style>
