import Image from "next/image";
import Link from "next/link";

const featuredItems = [
  {
    id: 1,
    name: "Carne 1",
    description: "Descrição da carne 1",
    price: 10.99,
    imageUrl: "/steaks/flank-steak.jpg",
    isActive: true,
    category: "Carnes",
  },
  {
    id: 2,
    name: "Cupim",
    description: "Descrição da carne 2",
    price: 12.99,
    imageUrl: "/steaks/cupim.jpg",
    isActive: true,
    category: "Carnes",
  },
];

const FeaturedSectionCards = () => (
  <div className="featured__cards_container">
    {featuredItems.map((item) => (
      <div key={item.id} className="featured__card">
        <Image src={item.imageUrl} width={200} height={200} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>R$ {item.price.toFixed(2)}</p>
      </div>
    ))}
  </div>
);

export default function FeaturedSection() {
  return (
    <section className="featured">
      <div className="featured__quote">
        <h2>
          “Não existe falta de tempo, existe falta de foco. Quem quer, faz bem
          feito.”
        </h2>
        <span>Antônio Andrade</span>
      </div>
      <div style={{ width: "100%" }}>
        <hr />
        <div className="featured__content">
          <div className="featured__more">
            <h3>
              Conheça <br /> nossas carnes
            </h3>
            <Link href="/menu" className="featured__link">
              Ver menu completo
            </Link>
          </div>
          <FeaturedSectionCards />
        </div>
        <hr />
      </div>
    </section>
  );
}
