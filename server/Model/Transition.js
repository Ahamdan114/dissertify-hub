import { Sequelize } from "sequelize";
import sequelize from "../SequelizeInstance.js";
import { Request } from "./Request.js";
export const Transition = sequelize.define("transition", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            isIn: [["pending", "accepted", "rejected", "completed"]],
        },
    },
    description: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue("createdAt");
            if (rawValue) {
                const formattedDate = new Date(rawValue)
                return formattedDate;
            }
            return null;
        },
        set(value) {
            const parsedDate = new Date(value);
            this.setDataValue("createdAt", parsedDate.toISOString().split("T")[0]);
        },
    },

    requestID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Request,
            key: "id",
        },
    },
});
