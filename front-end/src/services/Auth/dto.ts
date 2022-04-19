export type loginResponse = {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
  email: string;
  nivel: "user" | "admin";
  token: string;
  tokenExpiration: number;
};
