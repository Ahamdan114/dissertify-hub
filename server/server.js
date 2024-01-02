import express from "express";
import sequelize from "./SequelizeInstance.js";

import { File } from "./Model/index.js";
import { User, Request, Transition } from "./Model/associations.js";
import "./Model/associations.js";

const PORT = 8080;
const app = express();

app.use(express.json());

await sequelize.sync({ alter: true });

// Trying to find in db if the user exists in order to see if create it.
app.post("/api/user", async (request, response, next) => {
    const { user, password } = request.body;

    const existingUser = await User.findOne({
        where: {
            name: user,
            pass: password,
        },
    });

    if (existingUser) return response.status(409).json(existingUser);
    else {
        const createUser = await User.create({
            name: user,
            pass: password,
            type: user.split(".")[1],
        });
        return response.status(200).json(createUser);
    }
});

// Trying to find in db if the user exists in order to authenticate it.
app.post("/api/login", async (request, response, next) => {
    const { user, password } = request.body;
    const foundUser = await User.findOne({
        where: {
            name: user,
            pass: password,
        },
    });

    if (foundUser) {
        return response.status(201).json({
            message: "Data received successfully",
            data: foundUser,
        });
    } else {
        const error = new Error("Problem found");
        next(error);
    }
});

app.get("/api/request/:userId", async (request, response, next) => {
    const { userId } = request.params;
    try {
        const requests = await Request.findAll({
            where: sequelize.or(
                { studentID: Number(userId) },
                { professorID: Number(userId) }
            ),
            include: [
                {
                    model: User,
                    as: "student",
                },
                {
                    model: User,
                    as: "professor",
                },
                {
                    model: Transition,
                },
            ],
        });

        return response.status(200).json(requests);
    } catch (error) {
        next(error);
    }
});

app.patch("/api/request/:requestId", async (request, response, next) => {
    const { requestId } = request.params;
    const { status, feedback } = request.body;
    console.log(">>>>>>>>>>>>>>>>>" + status)
    const patchedRequest = await Request.findOne({
        where: {
            id: requestId,
        },
    });

    patchedRequest.status = status;
    await patchedRequest.save();

    await Transition.create({
        requestID: patchedRequest.id,
        status,
        description: feedback,
    });


    
    return response.status(201).json({patchedRequest});
});

// Example route to create a request
app.post("/api/request", async (request, response, next) => {
    try {
        const { studentName, professorName, title, description } = request.body;

        const student = await User.findOne({
            where: { name: studentName, type: "student" },
        });

        const professor = await User.findOne({
            where: { name: professorName, type: "professor" },
        });

        if (!student || !professor) {
            return response
                .status(404)
                .json({ message: "Student or professor not found" });
        }

        // Create the request using the found student and professor
        const newRequest = await Request.create({
            studentID: student.id,
            professorID: professor.id,
            title,
            description,
            status: "pending",
        });

        await Transition.create({
            requestID: newRequest.id,
            status: "pending",
            description
        });

        return response.status(201).json(newRequest);
    } catch (error) {
        next(error);
    }
});

app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send({ message: err });
});

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
