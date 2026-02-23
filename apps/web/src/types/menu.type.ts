export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}
