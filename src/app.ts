import express from "express";
import cors from "cors";
import analysisRoutes from "./components/analysis/analysisRoutes";
import authRoutes from "./components/auth/authRoutes";
import fileRoutes from "./components/file/fileRoutes";
import { handleError } from "./middlewares/handleError";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/analysis", analysisRoutes);
app.use("/auth", authRoutes);
app.use("/file", fileRoutes);

app.use(handleError);

export default app;
