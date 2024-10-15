import * as jwt from "jsonwebtoken";
import { getUserById } from "../utils/users";

async function checkJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(400).json({ message: "token is required" });

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY) as any;

    req._user = await getUserById(data.id);

    next();
  } catch (error) {
    res.status(401).json({ error: "token inválido" });
  }
}

export default checkJWT;
