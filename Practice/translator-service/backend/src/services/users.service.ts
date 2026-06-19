import { UsersRepository } from "../repos/users.repository";
import { TranslationError } from "../types/errors";

export class UsersService {
    private readonly usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public register = async ({ email, password }: { email: string, password: string }) => {
        try {
            const user = await this.usersRepository.create({ email, password });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public login = async ({ email, password }: { email: string, password: string }) => {
        try {
            const user = await this.usersRepository.findByEmail(email);
            if (!user) {
                throw new TranslationError('User not found', 404);
            }
            // const validPassword = await bcrypt.compare(password, user.password);
            // if (!validPassword) {
            //     throw new TranslationError('Invalid password', 401);
            // }
            return user;
        } catch (error) {
            throw error;
        }
    }

    public getById = async (id: number) => {
        try {
            const user = await this.usersRepository.findById(id);
            if (!user) {
                throw new TranslationError('User not found', 404);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    public update = async (id: number, { email, password }: { email: string, password: string }) => {
        try {
            const user = await this.usersRepository.update(id, { email, password });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public delete = async (id: number) => {
        try {
            const user = await this.usersRepository.delete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}   
