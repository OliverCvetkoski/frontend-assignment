export interface Product {
  id: string;
  name: string;
  slug: string;
  variants: [
    {
      name: string;
      price: number;
      stockLevel: string;
    }
  ];
  featuredAsset: {
    preview: string;
  };
}
