import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import { createUploadsFolder } from "./utils/files";
import { filesRouter } from "./modules/files/getFiles";

createUploadsFolder();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/uploads", filesRouter);

RegisterRoutes(app);

if (process.env.NODE_ENV !== "production") {
  const swaggerUi = require("swagger-ui-express");
  app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
    res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
  });
}

const port = 5000;

createConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`App rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    throw new Error("Não foi possível conectar ao Banco de dados " + err);
  });
