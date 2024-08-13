const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const config = {
  host: "127.0.0.1",
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
    console.log(err);
    if (err) {
      console.error("Error connecting to MySQL database", err);
      return;
    }
    console.log("Successfully connected to MySQL database");
  });
}

initializeDatabase();

// 엔드포인트
app.get("/", (req, res) => {
  res.send("Hello World");
});

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
    WHERE STATUS = 'user' 
    AND USERNAME LIKE ? 
    ORDER BY ${orderColumn} ${orderType} 
    LIMIT ?, ?
  `;
  const searchKeyword = `%${keyword}%`;
  connection.query(
    query,
    [searchKeyword, offset, parseInt(limit)],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send(`Error executing query: ${JSON.stringify(error)}`);
        return;
      }
      res.json(results);
    }
  );
});

app.get("/userListCNT", (req, res) => {
  const { keyword } = req.query;
  const query = `SELECT COUNT(*) CNT FROM USER WHERE STATUS = 'user' AND USERNAME LIKE ?`;
  const searchKeyword = `%${keyword}%`; // `LIKE`에 안전하게 사용할 키워드

  connection.query(query, [searchKeyword], (error, results, fields) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).send(`Error executing query${JSON.stringify(error)}`);
      return;
    }
    res.json(results);
  });
});
app.get("/userInfo", (req, res) => {
  const { userid } = req.query;
  const query = `SELECT * FROM USER WHERE USERID = ?`;

  connection.query(query, [userid], (error, results, fields) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).send(`Error executing query${JSON.stringify(error)}`);
      return;
    }
    res.json(results);
  });
});
app.get("/drinkList", (req, res) => {
  const query = `SELECT * FROM DRINK`;
  connection.query(query, [], (error, results, fields) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).send(`Error executing query${JSON.stringify(error)}`);
      return;
    }
    res.json(results);
  });
});

app.post("/userUpdate", (req, res) => {
  const { USERID, PASSWORD, USERNAME, PHONENUM, BIRTH, STATUS, STAMP } =
    req.body;

  const query = `UPDATE USER SET PASSWORD = ?, USERNAME = ?, PHONENUM = ?, BIRTH = ?, STATUS = ?, STAMP = ? WHERE USERID = ?`;

  connection.query(
    query,
    [PASSWORD, USERNAME, PHONENUM, BIRTH, STATUS, STAMP, USERID],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send(`Error executing query: ${JSON.stringify(error)}`);
        return;
      }
      res.json({ message: "회원정보 수정이 완료되었습니다." });
    }
  );
});
app.post("/userDelete", (req, res) => {
  const { USERID } = req.body;

  const query = `DELETE FROM USER WHERE USERID = ?`;

  connection.query(query, [USERID], (error, results, fields) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).send(`Error executing query: ${JSON.stringify(error)}`);
      return;
    }
    res.json({ message: "회원이 삭제 되었습니다." });
  });
});

app.post("/drinkIn", (req, res) => {
  const { DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE } = req.body;
  const query =
    `INSERT INTO drink (DRINKNAME,EXPLAN,URL,CATEGORY,PRICE,ISICE) ` +
    `VALUES( ? , ? , ? , ? , ? , ? )`;
  connection.query(
    query,
    [DRINKNAME, EXPLAN, URL, CATEGORY, PRICE, ISICE],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send(`Error executing query${JSON.stringify(error)}`);

        return;
      }
      res.json({ message: "음료가 추가 되었습니다." });
    }
  );
});

app.post("/login", (req, res) => {
  const { userid, pwd } = req.body;
  const query = `SELECT USER_NAME FROM USER WHERE USER_ID = ? AND PWD = ? `;
  connection.query(query, [userid, pwd], (error, results, fields) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).send(`Error executing query${JSON.stringify(error)}`);

      return;
    }
    res.json(results[0]);
  });
});

// 서버 시작
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
