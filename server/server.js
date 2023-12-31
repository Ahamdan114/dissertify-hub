import express from "express";
import { Sequelize } from "sequelize";
const PORT = 8080;
const app = express();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "storage_db.sqlite",
});

app.use(express.json());

sequelize.sync({ alter: true });

app.get("/", (request, response) => {
    return response.json({ message: "This is an message" });
});

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
