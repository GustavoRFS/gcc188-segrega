export type OrderInput = {
  userId: number;
  productId: number;
  orderPrice: number;
  date?: Date;
};

export type OrderOutput = {
  userId: number;
  productId: number;
  orderPrice: number;
  date: Date;
};