export type ProductInput = {
  name: string;
  price: number;
  image?: string;
};

export type ProductOutput = {
  id: number;
  name: string;
  price: number;
  image?: string;
};
