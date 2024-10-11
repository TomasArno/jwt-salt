import * as jwt from "jsonwebtoken";

function signJWT(data: string | Object) {
  const token = jwt.sign(data, process.env.SECRET_KEY);

  return token;
}

export { signJWT };
