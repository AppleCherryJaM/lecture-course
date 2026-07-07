import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/new', usersController.register);
usersRouter.post('/login', usersController.login);
usersRouter.get('/me', authMiddleware, usersController.getMe);
usersRouter.post('/logout', usersController.logout);

usersRouter.get('/:id', usersController.getById);

// usersRouter.put('/:id', UsersController.update);
// usersRouter.delete('/:id', UsersController.delete);

export default usersRouter;