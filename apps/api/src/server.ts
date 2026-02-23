import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Category } from "./entities/category";
import { Unit } from "./entities/unit";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/steaks", express.static(path.join(__dirname, "public/steaks")));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.get("/menu", async (req, res) => {
      try {
        const categoryRepo = AppDataSource.getRepository(Category);
        const menu = await categoryRepo.find({
          relations: {
            products: true,
          },
          order: {
            name: "ASC",
          },
        });

        return res.json(menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/units", async (req, res) => {
      try {
        const unitRepo = AppDataSource.getRepository(Unit);
        const units = await unitRepo.find();

        return res.json(units);
      } catch (error) {
        console.error("Error fetching units:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
