import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import { TranslationError } from "../types/errors";

export class UsersController {
    private readonly usersService = new UsersService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.usersService.register({ email, password });
            res.json({ user });
        } catch (error: TranslationError | any) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.usersService.login({ email, password });
            res.json({ user });
        } catch (error: TranslationError | any) {
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