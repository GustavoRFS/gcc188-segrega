import { OrderResponse } from "../Orders/dto";

export type User = {
  nivel: string;
  email: string;
  totalPoints: number;
  points: number;
  name: string;
  id: number;
  position?: number;
  orders: OrderResponse[];
};

export type UserRequest = {
  totalPoints: number;
  points: number;
  email: string;
  name: string;
};
