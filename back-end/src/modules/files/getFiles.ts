import { Router, Request, Response } from "express";
import path from "path";

const filesRouter = Router();

filesRouter.get("/:filename", (req: Request, res: Response) => {
  if (!req.params.filename) {
    return res.status(400).send("Bad Request");
  }
  res
    .status(200)
    .sendFile(path.join(__dirname, "../../../uploads/", req.params.filename));
});

export { filesRouter };
