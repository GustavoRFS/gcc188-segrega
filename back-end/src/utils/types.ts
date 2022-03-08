export interface ValidateErrorJSON {
  message: "Erro na validação dos dados";
  details: { [name: string]: unknown };
}
