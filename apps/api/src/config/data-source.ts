import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 5434),
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "braners_carners_db",
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});