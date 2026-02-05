import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.listen(3001, () => {
            console.log("Server is running on http://localhost:3001");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
        