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

app.post("/server/submitFormLogin", (request, response, next) => {
    const { user, password } = request.body;

    if (user.length > 3 && password.length > 3) {
        return response.json({
            message: "Data received successfully",
            data: request.body,
        });
    } else {
        const error = new Error("Problem found");
        next(err);
    }
});

app.use((err, request, response, next) => {
    console.log(err);
    response.send(500).send({ message: err });
});

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
