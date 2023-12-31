import { Sequelize } from "sequelize";

const Transition = Sequelize.define("Transition", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    requestID: {
        type: Sequelize.INTEGER,
        references: {
            model: "Request",
            key: "id",
        },
    },

    status: {
        type: "STRING",
        validate: {
            condition(value) {
                const possibleStates = ["pending", "accepted", "rejected", "completed"];
                const found = possibleStates.find((state) => state === value);
                if (found != undefined)
                    throw Error(
                        "You didn't set an option from the states. The options are [pending/accepted/rejected/completed]."
                    );
            },
        },
    },

    description: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue("createdAt");
            if (rawValue) {
                const formattedDate = new Date(rawValue).toLocaleDateString("en-US");
                return formattedDate;
            }
            return null;
        },

        set(value) {
            const parsedDate = new Date(value);
            this.setDataValue("createdAt", parsedDate.toISOString().split("T")[0]);
        },
    },
});

export default Transition;
