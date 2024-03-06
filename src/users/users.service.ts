import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async add(user: UserDto): Promise<void> {
        await this.usersRepository.insert(user).catch();
    }
}
