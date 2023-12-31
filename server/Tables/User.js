import { Sequelize } from "sequelize";

const User = new Sequelize.define("User", {
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
                if (value !== "proffesor" || value !== "student") {
                    throw Error("The user is supposed to be a proffesor or a student.");
                }
            },
        },
    },
});

export default User;
