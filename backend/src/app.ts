import express, { type Application, type Request, type Response } from "express";
import path from "path";
import fs from "fs";
import { type DirEntry } from "./DirEntry";

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from your Node.js backend (TypeScript)!");
// });
// const frontendDistPath = path.join(__dirname, "public");
// console.log(frontendDistPath);
// app.use(express.static(frontendDistPath));
// app.get("klant", (req: Request, res: Response) => {
//   res.sendFile(path.join(frontendDistPath, "index.html"));
// });

app.get("/api/path", (req: Request, res: Response) => {
  const path = req.query.dir as string ?? ".";
  const files = fs.readdirSync(path, {withFileTypes: true})
    .map((item): DirEntry => ({
      name: item.name,
      isDir: item.isDirectory(),
      isLink: item.isSymbolicLink(),
    }))
  return res.json(files);
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
