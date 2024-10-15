import "./utils/env";
import app from "./app";
import initDb from "./utils/init-db";

(() => {
  const PORT = process.env.PORT;
  initDb();

  app.listen(PORT, () => console.log("Server running on port:", PORT));
})();
