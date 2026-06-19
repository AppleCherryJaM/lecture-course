import { Router } from "express";
import TranslateController from "../controllers/translate.controller";
import { TranslateSchema } from "../schemas/translate.schema";
import { validate } from "../middlewares/validation.middleware";

const translateRoute = Router();

translateRoute.post("/", validate(TranslateSchema), TranslateController.translate);

export default translateRoute;