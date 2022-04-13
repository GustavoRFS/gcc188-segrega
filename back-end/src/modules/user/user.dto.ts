export type UserInput = {
  name: string;
  email: string;
  points: number;
  totalPoints: number;
  password: string;
};

export type UserOutput = {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
  email: string;
};
