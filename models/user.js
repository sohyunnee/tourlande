const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "유저번호"
    },
    username: {
      type: DataTypes.STRING(5),
      allowNull: true,
      comment: "유저명"
    },
    userbirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "생년월일"
    },
    usertel: {
      type: DataTypes.CHAR(13),
      allowNull: true,
      comment: "전화번호"
    },
    useraddr: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "주소"
    },
    userpassport: {
      type: DataTypes.CHAR(9),
      allowNull: true,
      comment: "여권번호"
    },
    userid: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "유저아이디"
    },
    userpass: {
      type: DataTypes.STRING(41),
      allowNull: true,
      comment: "유저비밀번호"
    },
    usersecess: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "탈퇴여부"
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userno" },
        ]
      },
    ]
  });
};
