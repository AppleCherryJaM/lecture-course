import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/new', usersController.register);
usersRouter.post('/login', usersController.login);

usersRouter.get('/:id', usersController.getById);

// usersRouter.put('/:id', UsersController.update);
// usersRouter.delete('/:id', UsersController.delete);

export default usersRouter;