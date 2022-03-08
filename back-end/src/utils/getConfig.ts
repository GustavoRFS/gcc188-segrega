import { config, configFields } from "../config";

const env = process.env.NODE_ENV ?? "localDev";

export const getConfig = (field: configFields) => {
  if (!config?.[env]?.[field]) {
    throw new Error("Campo de configuração inválido");
  }

  return config[env][field];
};
