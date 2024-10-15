import { readFile, writeFile } from "jsonfile";

async function getUserByProp(data, prop) {
  const { users } = await readFile("./src/db/auth.json");

  const user = users.find((user) => user[prop] == data);

  return user;
}

async function getUserById(id: string) {
  const user = await getUserByProp(id, "id");

  return user;
}

async function getUserByEmail(email: string) {
  const user = await getUserByProp(email, "email");

  return user;
}

async function getAllUsers() {
  const users = await readFile("./src/db/auth.json");

  return users;
}

async function saveUser(user: { id; email; password }) {
  const users = await getAllUsers();

  users.users.push(user);

  await writeFile("./src/db/auth.json", users);

  return true;
}

export { getUserById, getUserByEmail, getAllUsers, saveUser };
