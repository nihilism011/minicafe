# minicafe

## Project Setup
```
cd server    //서버로 디렉토리 이동
npm install  //서버 설치
새 터미널
경로 /minicafe 확인
npm install  //프로젝트 설치
```
### DB 폴더에 DB백업 sql

### Project Test
```
cd server       //서버로 디렉토리 이동
npm start       //서버 실행
새 터미널
경로 /minicafe 확인
npm run serve   //open with live server와 비슷한 기능
```

### Project Build
#### public path 설정
```
//vue.config.js

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/minicafe",
}
```
#### Build
```
npm run build  //배포하기 위한 빌드 
```




# Mini Cafe Project
![메인페이지](https://github.com/nihilism011/minicafe/blob/main/src/assets/MainPage.png)
+ vue cli 와 node server 를 활용해 로그인 및 회원가입, 관리자 페이지의 CRUD 를 구현
## 주요 기술
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 프로젝트 진행 중 학습 내용
+ CDN 으로 사용하는 Vue 가 아닌 Vue cli 를 통한 webpack 기반 Vue Options API 사용법
+ SPA 를 위한 Vue 의 컴포넌트 사용법
+ Vue Router 를 통한 SPA 내부에서 페이지 이동 구현 기초
+ Vuetify UI 라이브러리 기초 학습 및 라이브러리 최소 사용 방법 학습
+ AJAX 가 아닌 AXIOS 를 사용한 통신 방법 학습 ex)BaseUrl 및 전역 오류 처리

## 다음 프로젝트 학습 목표
+ Vue cli의 webpack 기반 이 아닌 create vue 를 통한 vite 기반 Vue 사용
+ Vue Options API 가 아닌 Composition API 활용
+ Type Script 사용법
+ 좀 더 효율적인 컴포넌트 관리
+ Vuetify UI 라이브러리 사용법 숙달 or 다른 UI 라이브러리 학습
  
## 주요 기능

### 회원가입
![image](https://github.com/user-attachments/assets/c5de4135-6a52-4b87-9181-85264deb472f)
띄어쓰기 입력 안되게 설정
전화번호에 숫자 외 입력 안되게 설정
아이디 5글자 이상 20글자 이하로 설정
그 외 자유
#### 수정 예정 사항
전화번호 본인인증을 통한 생년월일 받기
### 로그인 창
![image](https://github.com/user-attachments/assets/57c30fbe-1c81-4b15-b1bc-a8757afcbb0d)
관리자 id   : admin
<br>
관리자 pwd  : 1234
### 관리자 전용 메뉴 screenshot
#### STATUS 가 admin 인 관리자한테만 보이는 관리자 메뉴
![image](https://github.com/user-attachments/assets/a21be62a-6eb9-44ea-9a89-cb6d9013e6af)
#### 고객 관리
![image](https://github.com/user-attachments/assets/33e412bf-f02e-4ab1-b35b-2cb4fd0cf8b5)
#### 음료 관리
![image](https://github.com/user-attachments/assets/d55b256f-97de-4d9d-82c6-c5e7befb636e)
#### 고객 별 판매량 및 음료 별 판매량
![image](https://github.com/user-attachments/assets/8170579b-afd5-4e05-bfff-872920ce7818)
#### 고객 별 판매량 및 음료
![image](https://github.com/user-attachments/assets/58b08c69-f970-422f-ae54-2ab6d9647d00)
#### 음료 별 판매량 및 고객
![image](https://github.com/user-attachments/assets/1a8aee00-6c52-4d22-b4aa-2406628ff247)
#### 각 컬럼별 오름차순 내림차순 정렬
![image](https://github.com/user-attachments/assets/646c94be-84d5-4563-a866-6169f9d94bdc)
