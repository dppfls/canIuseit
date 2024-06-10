// 카테고리 번호와 일치하는 기준 정보를 데이터베이스에서 가져오거나
// 사용자가 기준 정보를 직접 입력하면
// 그 기준 값을 바탕으로 출력

/* 예상 예시 데이터 - 준희
{
  "name": "Milk",
  "manufactureDate": "2023-06-01",
  "shelfLifeDays": 10,
  "category": 1,  // 드롭다운에서 사용자가 선택한 카테고리를 번호로 처리
  "openedDate": "2023-06-05"
}

*/


const { Product, Category } = require('../models');

// 소비기한 계산 함수
const calculateExpiration = (date, shelfLifeDays) => {
    const expirationDate = new Date(date);
    expirationDate.setDate(expirationDate.getDate() + shelfLifeDays);
    return expirationDate;
};

exports.addProduct = async (req, res) => {
    try {
        const { name, manufactureDate, shelfLifeDays, category, openedDate } = req.body;

        if (!name || !openedDate || !category) {
            return res.status(400).json({ error: '이름, 개봉일자, 카테고리는 필수 입력 항목입니다.' });
        }

        let expirationDate;
        let consumptionDate;

        // 사용자가 shelfLifeDays를 제공하지 않은 경우
        if (!shelfLifeDays) {
            const categoryInfo = await Category.findByPk(category);
            if (!categoryInfo) {
                return res.status(400).json({ error: '카테고리를 찾을 수 없고, 소비기한일수가 제공되지 않았습니다.' });
            }

            expirationDate = calculateExpiration(openedDate, categoryInfo.shelfLifeDays);
        } else {
            expirationDate = calculateExpiration(openedDate, shelfLifeDays);
        }

        const product = await Product.create({
            name,
            manufactureDate,
            shelfLifeDays: shelfLifeDays || categoryInfo.shelfLifeDays,
            expirationDate,
            consumptionDate: expirationDate,
            category
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: '제품 추가 중 오류가 발생했습니다.' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: '제품 조회 중 오류가 발생했습니다.' });
    }
};
