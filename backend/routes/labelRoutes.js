const express = require('express');
const router = express.Router();
const pdf = require('pdfkit');
const path = require('path');
const Product = require('../models/Product');  // Product 모델 불러오기

// 라벨 페이지 렌더링 라우트
router.get('/label', async (req, res) => {
    const { productId } = req.query;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('label', {
            user: req.user,
            productName: product.alias,
            expiryDate: product.expiry_date.toISOString().split('T')[0],
            productId: product.productId,
            // productImagePath: product.imagePath // 이미지 경로를 템플릿에 전달
            productImagePath: `/uploads/${path.basename(product.imagePath)}` // 이미지 경로를 클라이언트가 접근 가능하게 설정
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 제품 라벨지 출력 API
router.post('/labels', async (req, res) => {
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

    } catch (error) {
        console.error('Error creating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
