import express from "express";
import appConfig from "../config";
import authRoutes from "./components/auth/public/authRoutes";
import fileRoutes from "./components/file/public/fileRoutes";
import pAuthRotues from "./components/auth/private/pAuthRoutes";
import { initDbConnection } from "./db";
import { handleError } from "./middlewares/handleError";

const app = express();
const PORT = appConfig.port;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/file", fileRoutes);

app.use("/admin/auth", pAuthRotues);
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
