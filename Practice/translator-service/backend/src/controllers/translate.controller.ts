import { Request, Response, NextFunction } from "express";
import { TranslationError } from "../types/errors";
import { translate } from "../services/translate.service";

class TranslateController {
    constructor() {}

    public async translate(req: Request, res: Response, next: NextFunction) {
        try {
            const { text, target, source } = req.body;
            const translatedText = await translate({ text, target, source });
            res.json({ translatedText });
        } catch (error: TranslationError | any) {
           next(error);
        }
    }
}

export default new TranslateController();