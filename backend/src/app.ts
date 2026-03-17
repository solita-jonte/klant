import express, { type Application, type Request, type Response } from "express";
import fs from "fs";
import { type DirEntry } from "./DirEntry";

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.get("/api/dir", (req: Request, res: Response) => {
  const path = req.query.path as string ?? ".";
  const files = fs.readdirSync(path, {withFileTypes: true})
    .map((item): DirEntry => ({
      name: item.name,
      isDir: item.isDirectory(),
      isLink: item.isSymbolicLink(),
    }))
  return res.json(files);
});

app.get("/api/file", (req: Request, res: Response) => {
  const path = req.query.path as string;
  console.log("Fetching file: " + path);
  return res.sendFile(path, {dotfiles: "allow"});
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
