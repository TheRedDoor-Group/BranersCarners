import { Unit } from "./entities/unit";
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

// Route to fetch all units
app.get("/units", async (req, res) => {
    try {
        const unitRepo = AppDataSource.getRepository(Unit);
        const units = await unitRepo.find();
        res.json(units);
    } catch (error) {
        console.error("Error fetching units:", error);
        res.status(500).json({ message: "Error fetching units" });
    }
})

// Temporary route to create a unit (for testing purposes)
app.post("/seed-units", async (req, res) => {
    const unitRepo = AppDataSource.getRepository(Unit);

    const units = [
        {
            name: "Mooca",
            slug: "unit-mooca",
            address: "Rua da Mooca, 1234",
            phone: "11999999999",
            gmapsLink: "https://goo.gl/maps/xxxx",
            whatsappLink: "https://api.whatsapp.com/send?phone=5511999999999",
        },
        {
            name: "Vila Mariana",
            slug: "unit-vila-mariana",
            address: "Rua da Vila Mariana, 1234",
            phone: "11988888888",
            gmapsLink: "https://goo.gl/maps/yyyy",
            whatsappLink: "https://api.whatsapp.com/send?phone=5511988888888",
        },
    ];

    try {
        await unitRepo.save(units);
        res.json({ message: "Units seeded successfully!" });
    } catch (error) {
        console.error("Error seeding units:", error);
        res.status(500).json({ message: "Error seeding units" });
    }
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
        