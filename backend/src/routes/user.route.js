import { Router } from "express";
import { UserAuthentication } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/signup").post(UserAuthentication.userRegister);
router.post("/login", UserAuthentication.userLogin);
router.post("/logout", verifyJWT, UserAuthentication.userLogout);
router.get("/check-auth", verifyJWT, UserAuthentication.checkAuth);
export default router;
