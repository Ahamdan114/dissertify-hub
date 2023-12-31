import { Sequelize } from "sequelize";

const File = Sequelize.define("File", {
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

export default File;
