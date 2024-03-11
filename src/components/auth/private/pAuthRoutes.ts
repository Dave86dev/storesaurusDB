import express from "express";
import { authJwt } from "../../../middlewares/authJwt";
import { isAdmin } from "../../../middlewares/isAdmin";
import { toggleActivation } from "./controllers/pAuthController";

const router = express.Router();

router.delete("/toggle", authJwt, isAdmin, toggleActivation)

export default router;