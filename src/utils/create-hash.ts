import crypto from "node:crypto";

function createHash(payload, salt) {
  const hash = crypto
    .createHash("sha256")
    .update(salt + payload)
    .digest("hex");

  return `${salt}:${hash}`; // ==> DATO A GUARDAR EN LA BBDD COMO CONTRASEÑA
}

function generateSalt() {
  return crypto.randomUUID();
}

export { createHash, generateSalt };
