// look.html 페이지만 보고 관련 백엔드 코드 임시로 틀만 잡았습니다
// 세부 사항들은 수정이 필요해요!!!! - 준희

// 
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const pdf = require('pdfkit');
const { GoogleAuth } = require('google-auth-library');

// MySQL 연결 설정 -> 변경 필요
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 서버 호스트
  user: 'username', // MySQL 사용자 이름
  password: 'password', // MySQL 사용자 비밀번호
  database: 'db', // MySQL 데이터베이스 이름 (계산 기준 저장한 db)
});

// Google Cloud Platform 인증 설정  -> 변경 필요
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});
const credentials = {
  client_id: '',
  client_secret: '',
  refresh_token: '',
};
auth.getClient(credentials);

// Express 앱 생성
const app = express();
app.use(bodyParser.json());

// 제품 목록 조회 API
app.get('/products', async (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => { // 오류 처리
    if (err) {
      console.error(err);
      res.status(500).send('서버 내부 오류가 발생했습니다.\n 다시 시도해주세요.');
      return;
    }
    res.json(results);
  });
});

// 라벨 출력 API -> pdf 형식의 docu 생성되도록 
app.post('/labels', async (req, res) => {
  const { productId } = req.body;
  const query = `SELECT * FROM products WHERE id = ${productId}`;
  connection.query(query, (err, results) => {  // 에러 처리
    if (err) {
      console.error(err);
      res.status(500).send('서버 내부 오류가 발생했습니다.\n 다시 시도해주세요.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('물건이 존재하지 않습니다');
      return;
    }
    const product = results[0];

    // PDF 생성
    const doc = new pdf();
    doc.fontSize(6); // 프린트할 라벨지가 작을 것 같아서 폰트 사이즈도 작게...ㅎㅎ
    doc.text(`제품명: ${product.name}`);
    doc.text(`제조사: ${product.manufacturer}`);
    doc.text(`제조일자: ${product.manufactureDate}`);
    doc.text(`소비기한: ${product.expirationDate}`);

    // PDF 프린트 아웃
    doc.pipe(res);
    doc.end();
  });
});

// 캘린더 등록 API ---> 관련 캘린더 api 불러오기도 필요
app.post('/calendar', async (req, res) => {
  const { productId } = req.body;
  const query = `SELECT * FROM products WHERE id = ${productId}`;
