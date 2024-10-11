import express from "express";
import checkJWT from "./middlewares/verify-jwt";
import { createHash, generateSalt } from "./utils/create-hash";

const app = express();

app.get("/users/me", checkJWT, async (req: any, res) => {
  console.log("pasé el checkJWT", req._user.id);
});

app.get("/auth/register", async (req: any, res) => {
  const salt = generateSalt();
  const hashedPassword = createHash(req.body.password, salt);
});

app.get("/auth/login", async (req: any, res) => {
  const { password, email } = req.body;
  // [HAGO LA BUSQUEDA POR MAIL EN LA BASE DE DATOS]

  const user = {
    email: "ada@ada.com",
    password: "hioawcrhacfhnca:cerñhnecwthnmñctwehnwtechnñtcehnñctwehñnthnñ",
  }; // RECUPERO ESTA INFO DE LA BASE DE DATOS

  const [salt, hash] = user.password.split(":");
  if (createHash(password, salt) == user.password) {
    res.status(200).json({ message: "login exitoso" });
  } else {
    res.status(401).json({ message: "contraseña incorrecta" });
  }
});

export default app;
