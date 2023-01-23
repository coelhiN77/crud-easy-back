import express from "express"
import userRoutes from "./routes/mecanicRouter.js"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes)

const port = 3001;
app.listen(port, () => {
  console.log(`API running correct on port: ${port} = OK!`);
});