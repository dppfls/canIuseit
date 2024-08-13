const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

class Product extends Model {}

Product.init({
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // 기본 키 설정
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true, // 별칭은 선택 입력 항목
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true, // 소비기한은 선택 입력 항목
  },
  categoryId: {  // 여기서 categoryId로 변경
    type: DataTypes.INTEGER,
    references: {
      model: Category, // Category 모델을 참조
      key: 'categoryId',  // 이 부분도 일치하게 변경
    },
    allowNull: false, // 카테고리 ID는 필수 입력 항목
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // 생성 시 자동으로 현재 시간 설정
  },
}, {
  tableName: 'products', // 테이블 이름 명시적 지정
  timestamps: false, // 타임스탬프 비활성화 (created_at을 명시적으로 사용하므로)
});

// Category와 Product 간의 관계 설정
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
