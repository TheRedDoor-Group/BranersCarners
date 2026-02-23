import { getTranslations } from "next-intl/server";
import { MenuSection } from "../../components/menuSection";
import { getUnits } from "../../services";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const units = await getUnits();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{t("title")}</h1>
      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {units.length === 0 ? (
          <p>
            Nenhuma unidade encontrada. Execute "{"<"}braners-carners/apps/api
            {">"} pnpm run seed" no backend.
          </p>
        ) : (
          units.map((unit) => (
            <div
              key={unit.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{unit.name}</h3>
              <p>{unit.address}</p>
              <p>📞 {unit.phone}</p>
            </div>
          ))
        )}
      </div>
      <MenuSection />
    </main>
  );
}
