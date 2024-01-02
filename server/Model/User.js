import { Sequelize } from "sequelize";
import sequelize from "../SequelizeInstance.js";

export const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        validate: {
            condition: (value) => {
                console.log("The value inside the type is " + value);
                if (value === "professor" || value === "student") {
                } else {
                    throw Error("The user is supposed to be a professor or a student.");
                }
            },
        },
    },
});
