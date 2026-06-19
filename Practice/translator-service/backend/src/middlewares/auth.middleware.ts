import { NextFunction } from "express";
import { Request, Response } from "express";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return; // важно: не вызываем next() после ответа
  }

  // проверка токена...
  next();
}