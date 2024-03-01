import express from "express";
import config from "../config";
import fileRoutes from "./components/file/public/fileRoutes";
import { initDbConnection } from "./db";
import { handleError } from "./middlewares/handleError";

const app = express();
const PORT = config.port;

app.use(express.json());

app.use("/file", fileRoutes);
app.use(handleError);

const startServer = async () => {
  try {
    await initDbConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
