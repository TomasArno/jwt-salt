import express, { json } from "express";

import checkJWT from "./middlewares/verify-jwt";
import { createToken } from "./utils/token";
import { createSaltAndHash, UUID } from "./utils/create-hash";

import { getUserByEmail, saveUser } from "./utils/users";

const app = express();

app.use(json());

app.get("/users/me", checkJWT, async (req: any, res) => {
  res.status(200).json({ data: req._user });
});

app.post("/auth/register", async (req: any, res) => {
  const { email, password } = req.body;

  const searchedEmail = await getUserByEmail(email);

  if (searchedEmail)
    return res.status(400).json({ error: "El usuario ya existe" });

  const salt = UUID();
  const hashedPassword = createSaltAndHash(password, salt);

  const id = UUID();
  await saveUser({
    id,
    email,
    password: hashedPassword,
  });

  const token = createToken({ id });

  res.status(201).json({ message: "usuario registrado", token });
});

app.post("/auth/login", async (req: any, res) => {
  const { password, email } = req.body;

  const user = await getUserByEmail(email);

  const [salt, hash] = user.password.split(":");

  if (createSaltAndHash(password, salt) == user.password) {
    const token = createToken({ id: user.id });

    res.status(200).json({ message: "login exitoso", token });
  } else {
    res.status(401).json({ message: "contraseña incorrecta" });
  }
});

export default app;
