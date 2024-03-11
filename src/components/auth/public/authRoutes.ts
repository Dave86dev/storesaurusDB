import express from "express";
import {
  userLogin,
  preLogin,
  preRegister,
  userRegister,
  userRegisterFinal,
  askDeactivation,
} from "./controllers/authController";
import { checkMailCode } from "../middlewares/checkMailCode";
import { authJwt } from "../../../middlewares/authJwt";
import { isActive } from "../../../middlewares/isActive";

const router = express.Router();

router.post("/deactivate", authJwt, isActive, askDeactivation);
router.post("/login", checkMailCode, userLogin);
router.post("/prelogin", preLogin);
router.post("/preregister", preRegister);
router.post("/register", checkMailCode, userRegister);
router.post("/registerfinal", userRegisterFinal);

export default router;
