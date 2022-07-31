"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User } = models;
      Message.belongsTo(User, { foreignKey: "authorId" });
    }
  }
  Message.init(
    {
      text: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Message",
      tableName: "messages",
    }
  );
  return Message;
};
