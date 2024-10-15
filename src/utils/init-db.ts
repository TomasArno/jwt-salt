import { existsSync, writeFileSync } from "node:fs";

function initDb() {
  if (!existsSync("./src/db/auth.json")) {
    writeFileSync(
      "./src/db/auth.json",
      JSON.stringify({
        users: [],
      })
    );
  }
}

export default initDb;
