import { Request, Response, NextFunction } from "express";
import { TranslationError } from "../types/errors";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof TranslationError) {
        return res.status(err.getStatus()).json({
            error: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        error: "Internal server error"
    });
};