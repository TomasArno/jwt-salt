import { config } from "dotenv";

(function checkEnv() {
  const env = process.argv[3];

  if (env == "development") {
    loadEnv();
  }
})();

function loadEnv() {
  config();
}
