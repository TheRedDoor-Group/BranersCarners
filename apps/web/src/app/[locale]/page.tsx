import { getTranslations } from 'next-intl/server';

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
      'Content-Type': 'application/json',
    },
  });


  if (!res.ok) {
    throw new Error('Failed to fetch units');
  }

  return res.json();
}

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  const units = await getUnits();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{t('title')}</h1>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {units.length === 0 ? (
          <p>Nenhuma unidade encontrada. Execute /seed-units no backend.</p>
        ) : (
          units.map((unit) => (
            <div 
              key={unit.id} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '1rem', 
                borderRadius: '8px' 
              }}
            >
              <h3>{unit.name}</h3>
              <p>{unit.address}</p>
              <p>📞 {unit.phone}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}