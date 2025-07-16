import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async createUser(email: string, password: string, name?: string): Promise<User> {
        const user = this.usersRepository.create({ email, password, name });
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }
}