export type User = {
  nivel: string;
  email: string;
  totalPoints: number;
  points: number;
  name: string;
  id: number;
  position?: number;
};

export type UserRequest = {
  totalPoints: number;
  points: number;
  email: string;
  name: string;
};
