import { Router } from "express";
import * as controllers from "./user.controllers";
import { authValidator } from "../../middlewares/schema-validator";

const router = Router();

router.post("/create", authValidator, controllers.create);

router.post("/login", authValidator, controllers.login);

export default router;
