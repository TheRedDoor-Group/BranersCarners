import { getMenu } from "../services";

export async function MenuSection() {
  const categories = await getMenu();

  if (categories.length === 0) {
    return (
      <div className="text-center py-10">Cardápio indisponível no momento.</div>
    );
  }
  return (
    <section className="py-16 bg-stone-50 text-stone-900" id="menu">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wide">
          Nossos Cortes
        </h2>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-red-800 inline-block pb-1">
                {category.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Imagem */}
                    <div className="h-48 bg-gray-200 relative overflow-hidden group">
                      <img
                        src={`${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold">{product.name}</h4>
                        <span className="text-red-800 font-bold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
