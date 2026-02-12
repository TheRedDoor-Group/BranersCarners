import { Button } from "@repo/ui/button";
import { getTranslations } from "next-intl/server";

interface Unit {
  id: number;
  name: string;
  address: string;
  phone: string;
}

// Function to fetch data from the backend
async function getUnits(): Promise<Unit[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch units");
  }

  return res.json();
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const units = await getUnits();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{t("title")}</h1>
      <div>
        <Button variant="primary">COELHO</Button>
      </div>
    </main>
  );
}
