import { Response, Request, NextFunction } from "express";
import { ValidateError } from "tsoa";

export default (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof ValidateError) {
    return res.status(422).json({
      message: "Erro na validação dos dados",
      details: err?.fields,
    });
  } else if (err instanceof Error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }

  next();
};
