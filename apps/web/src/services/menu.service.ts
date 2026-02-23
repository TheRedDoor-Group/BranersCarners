import { Category } from "../types";

/**
 * GET api menu.
 * * @returns A Promise that resolves to an array containing objects of type Category.
 * @throws {Error} If the API response is unsuccessful, throws an error (res.ok === false).
 */
export async function getMenu(): Promise<Category[]> {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3001";

    const res = await fetch(`${apiUrl}/menu`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Falha ao buscar menu");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}
