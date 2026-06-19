import { Request, Response, NextFunction } from "express";
import { TranslationError } from "../types/errors";
import { TranslateService } from "../services/translate.service";

class TranslateController {
    private readonly translationService = new TranslateService();

    public translate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { text, target, source } = req.body;
            const translatedText = await this.translationService.translate({ text, target, source });
            res.json({ translatedText });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public getTranslationHistory = async (req: Request, res: Response, next: NextFunction) => {
        // Здесь будет обращение к сервису для получения истории переводов
    }
}

export default new TranslateController();