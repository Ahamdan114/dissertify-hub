import express from "express";
const PORT = 8080;
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    return response.json({message: "This is an message"})
});

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
