import { Request, Response, NextFunction } from "express";
import { TranslationError } from "../types/errors";
import { TranslateService } from "../services/translate.service";

class TranslateController {
    private readonly translationService = new TranslateService();

    public translate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { text, target, source } = req.body;
            const userId = res.locals.userId || null;
            const translatedText = await this.translationService.translate({ text, target, source }, userId);
            res.json({ translatedText });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public getTranslationHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;
            const history = await this.translationService.getTranslationHistory(Number(userId), limit, offset);
            res.json(history);
        } catch (error: any) {
            next(error);
        }
    }
}

export default new TranslateController();