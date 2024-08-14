const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Category 모델 불러오기
const Product = require('../models/Product');   // Product 모델 불러오기
const pdf = require('pdfkit');
const path = require('path');

// 제품 추가
router.post('/register-product', async (req, res) => {
    try {
        console.log('POST /api/products/register-product request received');
        console.log('Request body:', req.body);

        // 로그가 안 출력되는 부분을 확인하기 위한 로그
        console.log('Starting categoryId parsing process');

        const { alias, expiry_date, categoryId } = req.body;

        // 로그인이 된 상태에서 userId를 가져옴
        const userId = req.user ? req.user.userId : null;

        console.log('categoryId before parsing:', categoryId);

        // category_id를 숫자로 변환
        const parsedCategoryId = parseInt(categoryId, 10);
        console.log('Parsed categoryId:', parsedCategoryId);

        // 카테고리 ID가 유효한지 확인
        const category = await Category.findByPk(parsedCategoryId);
        console.log('Category found:', category);

        if (!category) {
            console.log('Invalid category ID:', parsedCategoryId);
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User not logged in' });
        }

        // 새로운 제품을 products 테이블에 추가
        const newProduct = await Product.create({
            alias: alias,
            expiry_date: expiry_date,
            categoryId: category.categoryId, // 외래 키로 categoryId 사용
            userId: userId // 로그인된 사용자의 ID를 저장
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

/*
router.post('/api/products/labels', async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send('물건이 존재하지 않습니다');
        }

        // product.expiry_date를 Date 객체로 강제 변환
        const expiryDate = new Date(product.expiry_date);

        // 날짜를 YYYY-MM-DD 형식으로 변환
        const year = expiryDate.getFullYear();
        const month = String(expiryDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(expiryDate.getDate()).padStart(2, '0');
        const formattedExpiryDate = `${year}-${month}-${day}`;

        // PDF 생성
        const doc = new pdf();
        doc.fontSize(12);
        doc.text(`제품명: ${product.alias}`);
        doc.text(`소비기한: ${formattedExpiryDate}`);

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
*/

// 제품 라벨지 출력 API
router.post('/api/products/labels', async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // 한국어 TTF 폰트 파일 경로 설정
        const fontPath = path.join(__dirname, '..', 'frontend', 'resources', 'fonts', 'NOTOSANSKR-REGULAR.ttf');
        console.log(`Font path: ${fontPath}`);
    
        const doc = new pdf();

        console.log('PDF 생성 시작');
        doc.registerFont('NotoSansKR', fontPath); // 폰트 등록
        doc.font('NotoSansKR'); // 폰트 사용
        console.log('폰트 등록 완료');

        const expiryDate = new Date(product.expiry_date).toLocaleDateString('ko-KR');
        doc.fontSize(12).text(`제품명: ${product.alias}`);
        doc.text(`소비기한: ${expiryDate}`);
        console.log('텍스트 추가 완료');

        res.setHeader('Content-disposition', 'attachment; filename=label.pdf');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);
        doc.end();
        console.log('PDF 생성 완료 및 전송 시작');

        console.error('Error creating PDF:', error);
        res.status(500).send('Internal Server Error');
    } catch (error) {
        console.error('Error creating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;