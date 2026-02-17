import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { AdminUser } from "../entities/adminUser";
import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { Unit } from "../entities/unit";
import bcrypt from "bcryptjs";

const seed = async () => {
  console.log("Iniciando seed...");
  try {
    await AppDataSource.initialize();

    // Unidades
    const unitRepo = AppDataSource.getRepository(Unit);
    const existingUnit = await unitRepo.findOneBy({ slug: "matriz-sp" });

    if (!existingUnit) {
      await unitRepo.save([
        {
          name: "Braners Carners - Mooca",
          slug: "matriz-sp",
          address: "Rua Fulana de Tal, 200 - Mooca, São Paulo - SP",
          phone: "(11) 99999-9999",
          openingHours: {
            mon_fri: "11:30 - 15:00 | 18:30 - 23:00",
            sat: "12:00 - 00:00",
            sun: "12:00 - 17:00",
          },
        },
        {
          name: "Braners Carners - Tatuapé",
          slug: "filial-tatuape",
          address: "Rua Fulana de Tal, 200 - Tatuapé, São Paulo - SP",
          phone: "(11) 99999-9999",
          openingHours: {
            mon_fri: "12:00 - 16:00 | 19:00 - 00:00",
            sat_sun: "12:00 - 00:00",
          },
        },
      ]);
      console.log("Unidades criadas com sucesso!");
    }

    // Categorias
    const categoryRepo = AppDataSource.getRepository(Category);
    let carnesCategory = await categoryRepo.findOneBy({
      slug: "carnes-nobres",
    });
    let acompCategory = await categoryRepo.findOneBy({
      slug: "acompanhamentos",
    });

    if (!carnesCategory) {
      [carnesCategory, acompCategory] = await categoryRepo.save([
        { name: "Carnes Nobres", slug: "carnes-nobres" },
        { name: "Acompanhamentos", slug: "acompanhamentos" },
      ]);
      console.log("Categorias criadas.");
    }

    // Produtos
    const productRepo = AppDataSource.getRepository(Product);
    const existingProd = await productRepo.findOneBy({
      name: "Tomahawk Angus",
    });

    if (!existingProd && carnesCategory && acompCategory) {
      await productRepo.save([
        {
          name: "Tomahawk Angus",
          description: "Corte nobre com o osso da costela.",
          price: 249.9,
          image_url: "/uploads/tomahawk.jpg",
          category: carnesCategory,
          active: true,
        },
        {
          name: "Picanha Wagyu",
          description: "A rainha do churrasco, marmoreio nível 8.",
          price: 399.0,
          image_url: "/uploads/picanha.jpg",
          category: carnesCategory,
          active: true,
        },
        {
          name: "Farofa de Ovos",
          description: "Farofa crocante na manteiga de garrafa.",
          price: 29.9,
          image_url: "/uploads/farofa.jpg",
          category: acompCategory,
          active: true,
        },
      ]);
      console.log("Produtos criados.");
    }

    // Admin
    const adminRepo = AppDataSource.getRepository(AdminUser);
    const existingAdmin = await adminRepo.findOneBy({
      email: "admin@braners.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await adminRepo.save({
        name: "Master Admin",
        email: "admin@braners.com",
        password: hashedPassword,
      });
      console.log("Admin criado.");
    }
  } catch (error) {
    console.log("Erro no seed: ", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Seed finalizada.");
  }
};

seed();
