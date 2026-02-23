import { Unit } from "../types";

/**
 * GET api units.
 * * @returns A Promise that resolves to an array containing objects of type Unit.
 * @throws {Error} If the API response is unsuccessful, throws an error (res.ok === false).
 */
export async function getUnits(): Promise<Unit[]> {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3001";

    const res = await fetch(`${apiUrl}/units`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Status do Erro: ", res.status);
      throw new Error("Failed to fetch units");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
}
