import express from "npm:express";
import router from "./routes/router.js";
import { config } from "./depts.ts";

const app = express();

const { PORT } = await config();

app.route("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto: ${PORT}`);
});
