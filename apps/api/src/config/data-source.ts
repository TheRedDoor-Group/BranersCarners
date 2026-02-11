import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || process.env.POSTGRES_HOST || "postgres",
  port: parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || "5432"),
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "braners_carners_db",
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});
