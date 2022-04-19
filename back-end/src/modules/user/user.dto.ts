export type UserLogin = {
  email: string;
  password: string;
};

export type UserConfirm = {
  password: string;
};

export type UserConfirmOutput = {
  id: number;
};

export type UserInput = {
  name?: string;
  email?: string;
  points?: number;
  totalPoints?: number;
};

export type UserOutput = {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
  email: string;
  nivel: string;
};

export type UserEmailOutput = {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
  email: string;
  nivel: string;
  password: string;
};

export type UserLoginOutput = {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
  email: string;
  nivel: string;
  token: string;
  tokenExpiration: number;
};
