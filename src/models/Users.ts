const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").default;

class User extends Model {}

User.init(
    {
        prenom: { type: DataTypes.STRING, allowNull: false },
        nom: { type: DataTypes.STRING, allowNull: false },
        email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {
                isEmail: true
            }
        }

    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
    }
);

console.log(User === sequelize.models.User);

export default User