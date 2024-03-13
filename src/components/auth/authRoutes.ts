import express from "express";
import { checkMailCode } from "./middlewares/checkMailCode";
import { authJwt } from "../../middlewares/authJwt";
import { isActive } from "../../middlewares/isActive";
import { isAdmin } from "../../middlewares/isAdmin";
import { AuthService } from "./services/authServices";
import { generator } from "../../middlewares/generator";

const router = express.Router();

const authService = new AuthService();

router.post("/deactivate", authJwt, isActive, generator(authService.askForDeactivation, ["user"]));
router.post("/login", checkMailCode, generator(authService.loginUser, ["body"]));
router.post("/prelogin", generator(authService.preLoginEmail, ["body"]));
router.post("/preregister", generator(authService.preRegisterEmail, ["body"]));
router.post("/register", checkMailCode, generator(authService.userRegister, ["body"]));
router.post("/registerfinal", generator(authService.insertUser, ["body"]));

router.delete("/toggle", authJwt, isAdmin, generator(authService.toggleUserActivation, ["body"]));

export default router;
