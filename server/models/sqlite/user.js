"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email must be a valid email address",
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          length: {
            min: 8,
            max: 255,
            msg: "Password must be at least 8 characters",
          },
        },
      },
      role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          isIn: {
            args: [["user", "admin"]],
            msg: "Role must be either user or admin",
          }
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "false",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First name must be provided",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name must be provided",
          },
        },
      },
      pathway: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["Architecture des Logiciels", "Mobilité et Objects Connectés", "Intelligences Artificielles et Big Data",
            "Ingénierie de la Blockchain", "Ingénierie du Web", "Ingénierie de la 3D et des Jeux Vidéo",
            "Systèmes, Réseaux et Cloud Computing", "Sécurité Informatique", "Management et Conseil en Systèmes d'Information"]],
            msg: "Pathway must be one of the following: Architecture des Logiciels, Mobilité et Objects Connectés, Intelligences Artificielles et Big Data, Ingenierie de la Blockchain, Ingenierie du Web, Ingenierie de la 3D et des Jeux Vidéo, Systèmes, Réseaux et Cloud Computing, Sécurité Informatique, Management et Conseil en Systèmes d'Information",
          },
          notEmpty: {
            msg: "Pathway must be provided",
          },
        },
      }
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
    }
  );

  const hashPassword = async (user) => {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt(10)
    );
  };

  User.addHook("beforeCreate", hashPassword);
  User.addHook("beforeUpdate", async (user, { fields }) => {
    if (fields.includes("password")) {
      await hashPassword(user);
    }
  });

  return User;
};
