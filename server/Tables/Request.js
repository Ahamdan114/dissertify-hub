import { Sequelize } from "sequelize";

const Request = Sequelize.define("Request", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },

    professorID: {
        type: "INTEGER",
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },

    title: Sequelize.STRING,
    description: Sequelize.STRING,
});

export default Request;
