import { Sequelize } from "sequelize";
import sequelize from "../SequelizeInstance.js";

export const File = sequelize.define("file", {
    // can be downloaded and uploaded as .pdfs
    authorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    content: {
        type: Sequelize.STRING,
    },
});
 