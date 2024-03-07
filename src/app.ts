import express from "express";
import analysisRoutes from "./components/analysis/public/analysisRoutes";
import authRoutes from "./components/auth/public/authRoutes";
import fileRoutes from "./components/file/public/fileRoutes";
import pAuthRoutes from "./components/auth/private/pAuthRoutes";
import { handleError } from "./middlewares/handleError";

const app = express();

app.use(express.json());

app.use("/analysis", analysisRoutes);
app.use("/auth", authRoutes);
app.use("/file", fileRoutes);
app.use("/admin/auth", pAuthRoutes);

app.use(handleError);

export default app;
