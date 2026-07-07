import { Router } from "express";
import TranslateController from "../controllers/translate.controller";
import { TranslateSchema } from "../schemas/translate.schema";
import { validate } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const translateRoute = Router();

translateRoute.post("/", authMiddleware, validate(TranslateSchema), TranslateController.translate);
translateRoute.get("/history", authMiddleware, TranslateController.getTranslationHistory);

export default translateRoute;