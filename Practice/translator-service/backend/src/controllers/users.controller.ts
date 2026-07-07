import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import { SessionManager } from "../services/session.manager";
import { TranslationError } from "../types/errors";

export class UsersController {
    private readonly usersService = new UsersService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.usersService.register({ email, password });
            
            // Create session
            const token = SessionManager.createSession(user.id);
            res.cookie('sessionId', token, { 
                httpOnly: true, 
                secure: false, // Set to true if HTTPS is used
                sameSite: 'lax', 
                path: '/',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.usersService.login({ email, password });

            // Create session
            const token = SessionManager.createSession(user.id);
            res.cookie('sessionId', token, { 
                httpOnly: true, 
                secure: false, 
                sameSite: 'lax', 
                path: '/',
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public getMe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const user = await this.usersService.getById(Number(userId));
            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookieHeader = req.headers.cookie;
            if (cookieHeader) {
                const cookies: Record<string, string> = {};
                cookieHeader.split(';').forEach((cookie) => {
                    const parts = cookie.split('=');
                    const name = parts.shift()?.trim();
                    if (name) {
                        cookies[name] = decodeURIComponent(parts.join('='));
                    }
                });
                const sessionId = cookies['sessionId'];
                if (sessionId) {
                    SessionManager.destroySession(sessionId);
                }
            }
            res.clearCookie('sessionId', { path: '/' });
            res.json({ success: true });
        } catch (error: any) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.usersService.getById(Number(id));
            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await this.usersService.update(Number(id), { email, password });
            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.usersService.delete(Number(id));
            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }
}