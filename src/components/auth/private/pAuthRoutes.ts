import express from "express";
import { authJwt } from "../../../middlewares/authJwt";
import { isActive } from "../../../middlewares/isActive";
import { isAdmin } from "../../../middlewares/isAdmin";
import { deactivateU } from "./controllers/pAuthController";

const router = express.Router();

router.delete("/deactivate", authJwt, isActive, isAdmin, deactivateU)

export default router;