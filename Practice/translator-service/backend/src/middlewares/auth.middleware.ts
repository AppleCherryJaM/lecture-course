import { Request, Response, NextFunction } from "express";
import { SessionManager } from "../services/session.manager";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cookieHeader = req.headers.cookie;
  const cookies: Record<string, string> = {};

  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      const name = parts.shift()?.trim();
      if (name) {
        cookies[name] = decodeURIComponent(parts.join('='));
      }
    });
  }

  const sessionId = cookies['sessionId'];

  if (!sessionId) {
    res.status(401).json({ error: 'Unauthorized: No session token provided' });
    return;
  }

  const userId = SessionManager.getUserId(sessionId);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
    return;
  }

  res.locals.userId = userId;
  next();
}