export type UserLogin = {
  email: string;
  password: string;
};

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
  token: string;
  tokenExpiration: string;
};
