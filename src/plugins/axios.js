// src/plugins/axios.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// // --요청 인터셉터 설정
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // --토큰 등을 헤더에 추가할 수 있습니다.
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적일 때는 그대로 반환
  (error) => {
    console.error("Error during Axios request:", error);
    alert("서버 오류가 발생했습니다. 다시 시도해주세요."); // 글로벌 오류 메시지
    return Promise.reject(error); // 오류를 반환하여 필요하면 추가 처리 가능
  }
);

export default axiosInstance;
