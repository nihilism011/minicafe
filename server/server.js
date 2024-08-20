const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test1234",
  database: "minicafe",
};

// MySQL 데이터베이스와 연결을 유지하기 위한 전역 변수
let connection;

// 데이터베이스 연결 설정
function initializeDatabase() {
  connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database", err);
      return;
    }
    console.log("Successfully connected to MySQL database");
  });
}

initializeDatabase();

// 엔드포인트들
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 사용자 목록 조회
app.get("/userList", (req, res) => {
  const { keyword, odr, odrt, page = 1, limit = 10 } = req.query;
  const allowedOrderColumns = [
    "USERID",
    "USERNAME",
    "CREATEDATE",
    "BIRTH",
    "STAMP",
  ];
  const allowedOrderTypes = ["ASC", "DESC"];
  const orderColumn = allowedOrderColumns.includes(odr) ? odr : "CREATEDATE";
  const orderType = allowedOrderTypes.includes(odrt) ? odrt : "ASC";
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const query = `
    SELECT * 
    FROM USER 
    WHERE USERNAME LIKE ? 
    ORDER BY ${orderColumn} ${orderType} 
    LIMIT ?, ?
  `;
  const searchKeyword = `%${keyword}%`;
  connection.query(
    query,
    [searchKeyword, offset, parseInt(limit)],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json(results);
    }
  );
});

// 사용자 수 조회
app.get("/userListCNT", (req, res) => {
  const { keyword } = req.query;
  const query = `SELECT COUNT(*) CNT FROM USER WHERE USERNAME LIKE ?`;
  const searchKeyword = `%${keyword}%`;

  connection.query(query, [searchKeyword], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

// 사용자 정보 조회
app.get("/userInfo", (req, res) => {
  const { userid } = req.query;
  const query = `SELECT * FROM USER WHERE USERID = ?`;

  connection.query(query, [userid], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

// 음료 목록 조회
app.get("/drinkList", (req, res) => {
  const query = `SELECT * FROM DRINK `;
  connection.query(query, [], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
// 음료 하나 갖고오기
app.get("/getDrink", (req, res) => {
  const { drinkid } = req.query;
  const query = `SELECT * FROM DRINK WHERE DRINKNO = ?`;
  connection.query(query, [drinkid], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
// 관리자용 사용자 업데이트
app.post("/userUpdate", (req, res) => {
  const { USERID, PASSWORD, USERNAME, PHONENUM, BIRTH, STATUS, STAMP } =
    req.body;
  const query = `UPDATE USER SET PASSWORD = ?, USERNAME = ?, PHONENUM = ?, BIRTH = ?, STATUS = ?, STAMP = ? WHERE USERID = ?`;

  connection.query(
    query,
    [PASSWORD, USERNAME, PHONENUM, BIRTH, STATUS, STAMP, USERID],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json({ message: "회원정보 수정이 완료되었습니다." });
    }
  );
});

// 사용자용 사용자 업데이트
app.post("/usersUpdate", (req, res) => {
  const { USERID, PASSWORD, USERNAME, PHONENUM } = req.body;
  const query = `UPDATE USER SET PASSWORD = ?, USERNAME = ?, PHONENUM = ? WHERE USERID = ?`;

  connection.query(
    query,
    [PASSWORD, USERNAME, PHONENUM, USERID],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json({ message: "회원정보 수정이 완료되었습니다." });
    }
  );
});

// 사용자 회원 가입
app.post("/userInsert", (req, res) => {
  const { USERID, PASSWORD, USERNAME, PHONENUM, BIRTH } = req.body;
  const query = `INSERT INTO user VALUES ( ? , ? , ? , ? , ? , NOW() , 'user' , 0 )`;

  connection.query(
    query,
    [USERID, PASSWORD, USERNAME, PHONENUM, BIRTH],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json({ message: "회원 가입이 완료되었습니다." });
    }
  );
});
// 주문 입력
app.post("/order", (req, res) => {
  const { userId, count, drinkNo } = req.body;
  const query = `INSERT INTO ordermenu(USERID,DRINKNO,EA,ORDERTIME) VALUES(?,?,?,NOW())`;

  connection.query(query, [userId, drinkNo, count], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json({ message: "주문이 완료되었습니다." });
  });
});
//스탬프 업
app.post("/stamp", (req, res) => {
  const { userId, count } = req.body;
  const query = `UPDATE user SET STAMP = STAMP + ? WHERE USERID = ?`;

  connection.query(query, [count, userId], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json({ message: "" });
  });
});

//아이디 중복 체크
app.get("/idCheck", (req, res) => {
  const { id } = req.query;
  const query = `SELECT COUNT(*) cnt FROM user WHERE USERID = ?`;

  connection.query(query, [id], (error, results) => {
    if (error) {
      return next(error);
    }
    const isuser = results[0].cnt == "0";
    res.json(isuser);
  });
});
// 사용자 삭제
app.post("/userDelete", (req, res) => {
  const { USERID } = req.body;
  const query = `DELETE FROM USER WHERE USERID = ?`;

  connection.query(query, [USERID], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json({ message: "회원이 삭제 되었습니다." });
  });
});
//주문 조회 유저별
app.get("/orderUser", (req, res) => {
  const query = `SELECT USERID userId, SUM(EA) sum FROM ordermenu GROUP BY userId ORDER BY sum desc;`;
  connection.query(query, [], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
// 특정 유저 주문 조회
app.get("/orderUserId", (req, res) => {
  const { userid } = req.query;
  const query = `SELECT d.DRINKName,d.URL, uc.cnt FROM drink AS d INNER JOIN (SELECT DRINKNO, SUM(EA) AS cnt FROM ordermenu WHERE USERID = '${userid}' GROUP BY DRINKNO) AS uc ON uc.DRINKNO = d.DRINKNO ORDER BY cnt desc`;

  console.log(query);
  connection.query(query, [], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

// 특정 음료 주문 조회
app.get("/orderDrinkId", (req, res) => {
  const { drinkno } = req.query;
  const query = `SELECT k.userid,u.USERNAME,k.cnt FROM (SELECT USERID userid, SUM(EA) cnt FROM ordermenu WHERE DRINKNO = ${drinkno} GROUP BY USERID) k LEFT JOIN user u ON u.USERID = k.userid`;

  console.log(query);
  connection.query(query, [], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
//주문 조회 음료별
app.get("/orderDrink", (req, res) => {
  const query =
    "SELECT d.DRINKNAME AS drinkName, dcnt.drinkNo AS drinkNo, dcnt.s AS cnt " +
    "FROM drink as d " +
    "INNER JOIN (SELECT DRINKNO as drinkNo, SUM(EA) as s FROM ordermenu GROUP BY drinkNo) as dcnt " +
    "ON dcnt.drinkNo = d.DRINKNO ORDER BY cnt DESC";
  connection.query(query, [], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

// 음료 삭제
app.post("/deleteDrink", (req, res) => {
  const { drinkNo } = req.body;
  const query = `DELETE FROM DRINK WHERE DRINKNO = ?`;

  connection.query(query, [drinkNo], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json({ message: "음료가 삭제 되었습니다." });
  });
});

// 음료 추가
app.post("/drinkIn", (req, res) => {
  const { DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE } = req.body;
  const query = `INSERT INTO drink (DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json({ message: "음료가 추가 되었습니다." });
    }
  );
});

// 음료 업데이트
app.post("/drinkUp", (req, res) => {
  const { DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE, DRINKNO } = req.body;
  const query = `UPDATE drink SET DRINKNAME = ?, EXPLAN = ?, URL = ?, CATEGORY = ?, PRICE = ?, ISICE = ? WHERE DRINKNO = ?`;

  connection.query(
    query,
    [DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE, DRINKNO],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.json({ message: "음료가 수정 되었습니다." });
    }
  );
});

// 음료 정보 조회
app.get("/drinkSet", (req, res) => {
  const { drinkno } = req.query;
  const query = `SELECT * FROM DRINK WHERE DRINKNO = ?`;

  connection.query(query, [drinkno], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

// 로그인
app.post("/login", (req, res) => {
  const { userid, pwd } = req.body;
  const query = `SELECT USERID, USERNAME, STATUS FROM USER WHERE USERID = ? AND PASSWORD = ?`;

  connection.query(query, [userid, pwd], (error, results) => {
    if (error) {
      return next(error);
    }
    res.json(results[0]);
  });
});

// 전역 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.message);
  res.status(500).json({
    message: "서버에서 문제가 발생했습니다.",
    error: err.message,
  });
});

// 서버 시작
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
