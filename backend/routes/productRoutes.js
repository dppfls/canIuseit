const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Category 모델 불러오기
const Product = require('../models/Product');   // Product 모델 불러오기

router.post('/register-product', async (req, res) => {
    try {
        console.log('POST /api/products/register-product request received');
        console.log('Request body:', req.body);

        // 로그가 안 출력되는 부분을 확인하기 위한 로그
        console.log('Starting categoryId parsing process');
        
        const { alias, expiry_date, categoryId } = req.body;

        console.log('category_id before parsing:', categoryId);

        // category_id를 숫자로 변환
        const parsedCategoryId = parseInt(categoryId, 10); 
        console.log('Parsed category_id:', parsedCategoryId);

        // 카테고리 ID가 유효한지 확인
        const category = await Category.findByPk(parsedCategoryId);
        console.log('Category found:', category);

        if (!category) {
            console.log('Invalid category ID:', parsedCategoryId);
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        // 새로운 제품을 products 테이블에 추가
        const newProduct = await Product.create({
            alias: alias,
            expiry_date: expiry_date,
            category_id: category.categoryId // 외래 키로 categoryId 사용
        });

        console.log('New product saved:', newProduct);
        console.log('Product information successfully saved.');

        res.status(200).json({ success: true, product: newProduct });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error', error: err });
    }
});

// 제품 삭제 API
router.delete('/delete-product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        
        // 제품 삭제
        const result = await Product.destroy({ where: { productId: productId } });

        if (result) {
            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database error', error: err });
    }
});

// 라벨 출력 API -> pdf 형식의 문서 생성되도록
router.post('/labels', async (req, res) => {
    const { productId } = req.body;  // POST 요청으로 전달된 productId를 받음
    try {
      const product = await Product.findByPk(productId);  // productId를 이용해 제품을 찾음
      if (!product) {
        return res.status(404).send('물건이 존재하지 않습니다');
      }
  
      // PDF 생성
      const doc = new pdf();
      doc.fontSize(12); // 프린트할 라벨지가 작을 것 같아서 폰트 사이즈도 작게 설정
      doc.text(`제품명: ${product.alias}`);
      doc.text(`소비기한: ${product.expiry_date}`);
  
      // PDF 프린트 아웃
      res.setHeader('Content-disposition', 'attachment; filename=label.pdf');
      res.setHeader('Content-type', 'application/pdf');
      doc.pipe(res);
      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('서버 내부 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
  

module.exports = router;