const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").default;

class User extends Model {}

User.init(
    {
        prenom: { type: DataTypes.STRING, allowNull: false },
        nom: { type: DataTypes.STRING }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
    }
);

console.log(User === sequelize.models.User);

export default User