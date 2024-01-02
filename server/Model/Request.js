import { Sequelize } from "sequelize";
import sequelize from "../SequelizeInstance.js";

import { User } from "./User.js";

export const Request = sequelize.define("request", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    status: {
        type: Sequelize.STRING,
        validate: {
            isIn: [["pending", "accepted", "rejected", "completed"]],
        },
    },
    studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    professorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
});
