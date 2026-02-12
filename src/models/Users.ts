const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize('sqlite::memory:')

class User extends Model {}

User.init(
    {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING }
    },
    {
        sequelize,
        modelName: "User"
    }
);

console.log(User === sequelize.Models.User);
