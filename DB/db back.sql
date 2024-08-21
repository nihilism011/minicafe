-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- minicafe 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `minicafe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `minicafe`;

-- 테이블 minicafe.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `BOARDNO` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CONTENTS` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CREATETIME` datetime NOT NULL,
  `USERID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `REFER` int DEFAULT NULL,
  PRIMARY KEY (`BOARDNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 minicafe.board:~0 rows (대략적) 내보내기

-- 테이블 minicafe.drink 구조 내보내기
CREATE TABLE IF NOT EXISTS `drink` (
  `DRINKNO` int NOT NULL AUTO_INCREMENT,
  `DRINKNAME` varchar(50) NOT NULL,
  `EXPLAN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `URL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CATEGORY` varchar(50) NOT NULL,
  `PRICE` int NOT NULL,
  `ISICE` varchar(50) NOT NULL,
  PRIMARY KEY (`DRINKNO`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 minicafe.drink:~19 rows (대략적) 내보내기
INSERT INTO `drink` (`DRINKNO`, `DRINKNAME`, `EXPLAN`, `URL`, `CATEGORY`, `PRICE`, `ISICE`) VALUES
	(1, '연유라떼', '향기로운 에스프레소 샷, 부드러운 우유 그리고 달콤한 연유가 조화롭게 어우러진 라떼', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132459_1717993499610_KiXcTR2q5P.jpg', '커피', 2500, 'ICE'),
	(2, '아메리카노', '[기본2샷]메가MGC커피 블렌드 원두로 추출한 에스프레소에 물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105645_1717984605982_8i5CoHU2NV.jpg', '커피', 2500, 'HOT'),
	(3, '에스프레소', '커피 원두의 향미를 온전히 즐길 수 있는 에스프레소', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105357_1717984437294_AduuhU3VyW.jpg', '커피', 2000, 'HOT'),
	(4, '복숭아아이스티', '깊은 맛의 홍차와 달콤한 복숭아의 은은한 향이 어우러진 시원한 여름철 인기 음료.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132446_1717993486995_hvfli27vPn.jpg', '티', 3000, 'ICE'),
	(7, '삭제예정 더미', '삭제예정 더미', 'https://cdn.pixabay.com/photo/2020/04/06/13/37/coffee-5009730_960_720.png', '커피', 9999, 'HOT'),
	(8, '더미음료2', '더미 음료입니다.', 'https://cdn.pixabay.com/photo/2020/04/06/13/37/coffee-5009730_960_720.png', '에이드', 1000, 'ICE'),
	(9, '골드망고스무디', '황금빛 골드망고가 진하게 느껴지는 부드럽고 상큼 달콤한 스무디', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610112826_1717986506337_AauGwyguRG.jpg', '스무디', 4500, 'ICE'),
	(10, '코코넛 커피 스무디', '바삭하고 고소한 코코넛 칩을 올리고 쌉싸름한 커피와 달콤한 코코넛이 조화로운 스무디', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132830_1717993710301_PxTeTM9Suh.jpg', '스무디', 1000, 'ICE'),
	(11, '딸기요거트스무디', '요거트의 상큼함과 딸기의 상큼함을 상냥하게 어우른 상큼 스무디.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132117_1717993277823_KRGDVA4aeJ.jpg', '스무디', 6700, 'ICE'),
	(12, '플레인요거트스무디', '더 시원하게 요거트의 새콤달콤한 맛을 오롯이 만끽할 수 있는 스무디.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240612101151_1718154711606_iC5h64zrID.jpg', '스무디', 3400, 'ICE'),
	(13, '레몬에이드', '시트러스향 가득한 레몬의 상큼함과 톡쏘는 탄산의 상쾌함이 만난 청량 에이드.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114557_1717987557279_GKXThr0HAc.jpg', '에이드', 3000, 'ICE'),
	(14, '블루레몬에이드', '레몬에이드의 상큼한 청량감에 블루큐라소의 진한 향미를 더한 에이드.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132302_1717993382502_3JianCydlm.jpg', '에이드', 2500, 'ICE'),
	(15, '자몽에이드', '자몽의 달콤쌉싸름한 맛과 탄산의 톡쏘는 목넘김이 어우러진 트로피컬 에이드.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132602_1717993562754_oDf7jybQYy.jpg', '에이드', 50000, 'ICE'),
	(16, '페퍼민트', '멘톨향의 묵직한 청량감, 상쾌한 맛과 향이 인상적인 허브티.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110026_1717984826888_gfP6LsxEV3.jpg', '티', 3000, 'HOT'),
	(17, '캐모마일', '마음을 진정 시켜주는 산뜻한 풀내음을 느낄 수 있는 허브티.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105908_1717984748214_qc34s7Vkq5.jpg', '티', 2000, 'HOT'),
	(18, '얼그레이', '홍차 특유의 풍부한 플레이버를 만끽할 수 있는 허브티.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105659_1717984619283_Ssc082a5GK.jpg', '티', 300, 'HOT'),
	(19, '바닐라라떼', '바닐라의 짙은 향과 풍부한 폼 밀크의 조화가 인상적인 달콤한 라떼.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610104603_1717983963750_lApih2z1h0.jpg', '커피', 2000, 'HOT'),
	(20, '티라미수라떼', '에스프레소와 티라미수 소스 & 우유 그리고 풍미를 더해주는 달달한 크림까지 곁들여 완성한 티라미수 라떼.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110012_1717984812018_NPttY_PPM3.jpg', '커피', 50000, 'HOT'),
	(21, '카페라떼', '진한 에스프레소와 부드러운 우유가 어우러져 고소한 풍미를 완성한 라떼.', 'https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105821_1717984701991_RUKCqSZ_HO.jpg', '커피', 15000, 'HOT');

-- 테이블 minicafe.ordermenu 구조 내보내기
CREATE TABLE IF NOT EXISTS `ordermenu` (
  `ORDERNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) NOT NULL,
  `DRINKNO` varchar(50) NOT NULL,
  `EA` int NOT NULL,
  `ORDERTIME` datetime NOT NULL,
  PRIMARY KEY (`ORDERNO`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 minicafe.ordermenu:~23 rows (대략적) 내보내기
INSERT INTO `ordermenu` (`ORDERNO`, `USERID`, `DRINKNO`, `EA`, `ORDERTIME`) VALUES
	(1, 'admin', '1', 1, '2024-08-19 12:37:59'),
	(2, 'admin', '4', 2, '2024-08-19 12:42:34'),
	(3, 'admin', '2', 4, '2024-08-19 12:43:22'),
	(4, 'admin', '3', 1, '2024-08-19 12:44:12'),
	(5, 'admin', '1', 1, '2024-08-19 12:45:21'),
	(6, 'admin', '2', 1, '2024-08-19 12:45:48'),
	(7, 'admin', '1', 1, '2024-08-19 13:05:23'),
	(8, 'user2', '3', 1, '2024-08-19 13:51:41'),
	(9, 'user4', '1', 3, '2024-08-19 13:52:55'),
	(10, 'admin', '3', 1, '2024-08-20 13:45:44'),
	(11, 'admin', '4', 1, '2024-08-20 13:46:31'),
	(12, 'admin', '18', 1, '2024-08-20 13:52:19'),
	(13, 'drdrdr1', '9', 3, '2024-08-20 18:01:35'),
	(14, 'drdrdr1', '18', 5, '2024-08-20 18:01:41'),
	(15, 'drdrdr1', '15', 1, '2024-08-20 18:01:46'),
	(16, 'kkk9789', '11', 2, '2024-08-20 18:02:50'),
	(17, 'kkk9789', '12', 1, '2024-08-20 18:02:55'),
	(18, 'qwer011', '13', 2, '2024-08-20 18:03:37'),
	(19, 'qwer011', '17', 2, '2024-08-20 18:03:41'),
	(20, 'qwer011', '20', 1, '2024-08-20 18:03:46'),
	(21, 'helloworld', '2', 6, '2024-08-20 18:04:36'),
	(22, 'helloworld', '19', 2, '2024-08-20 18:04:42'),
	(23, 'helloworld', '21', 1, '2024-08-20 18:04:46');

-- 테이블 minicafe.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `USERID` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PHONENUM` varchar(50) NOT NULL,
  `BIRTH` date NOT NULL,
  `CREATEDATE` datetime NOT NULL,
  `STATUS` varchar(50) NOT NULL,
  `STAMP` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 minicafe.user:~22 rows (대략적) 내보내기
INSERT INTO `user` (`USERID`, `PASSWORD`, `USERNAME`, `PHONENUM`, `BIRTH`, `CREATEDATE`, `STATUS`, `STAMP`) VALUES
	('admin', '1234', 'admin', '01052902267', '1992-01-19', '2024-08-08 15:54:17', 'admin', 10002),
	('drdrdr1', '1234', '드릴', '000', '1989-02-05', '2024-08-20 18:01:22', 'user', 9),
	('emfprhs011', '1234', '하현수', '0101010', '1992-01-19', '2024-08-14 14:39:47', 'user', 2),
	('helloworld', '1234', 'helloworld', '010', '1993-01-30', '2024-08-20 18:04:23', 'user', 9),
	('kkk9789', '1234', 'kkk단', '010', '2001-12-18', '2024-08-20 18:02:39', 'user', 3),
	('qwer011', '1234', 'qwer', '010', '1989-12-02', '2024-08-20 18:03:19', 'user', 5),
	('user1', '1234', '김하나', '01012345677', '1995-01-10', '2020-03-05 14:32:10', 'user', 24),
	('user100', '1234', 'testuser', '01022221111', '1980-04-04', '2024-08-16 17:54:29', 'user', 0),
	('user13', '1234', '고윤서', '01034598765', '1985-01-19', '2022-02-19 16:45:11', 'user', 2),
	('user14', '1234', '김태영', '01045687654', '1997-08-14', '2022-04-29 18:30:22', 'user', 28),
	('user15', '1234', '정성훈', '01056776543', '1993-09-08', '2022-06-05 09:23:58', 'user', 35),
	('user16', '1234', '홍채린', '01067865432', '1986-11-17', '2022-08-12 07:19:15', 'user', 15),
	('user17', '1234', '이수현', '01078954321', '1991-03-29', '2022-10-27 10:52:34', 'user', 21),
	('user18', '1234', '박서준', '01089043210', '1984-04-07', '2023-01-02 13:33:47', 'user', 10),
	('user19', '1234', '전하린', '01090132109', '2000-07-11', '2023-05-14 22:18:03', 'user', 27),
	('user2', '1234', '박철수', '01023456789', '1992-07-19', '2020-05-12 08:45:22', 'user', 26),
	('user3', '1234', 'Apps', '01000000000', '1981-05-05', '2024-08-20 12:36:20', 'user', 0),
	('user304', '1234', '강형욱', '01022223333', '1992-01-19', '2024-08-14 14:29:53', 'user', 0),
	('user7', '1234', '장서준', '01078901234', '1991-09-30', '2021-01-20 14:27:39', 'user', 5),
	('user8', '1234', '윤민아', '01089012345', '1994-05-25', '2021-03-11 17:56:02', 'user', 20),
	('user9', '1234', '조현수', '01090123456', '1990-06-13', '2021-06-18 12:42:58', 'user', 29),
	('한글아이디', '1234', '한글아이디', '01055555555', '1960-06-12', '2024-08-20 17:23:07', 'user', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
