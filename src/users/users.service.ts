import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCreateDto } from "./user-create.dto";
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

    getById(id: number): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async getPassByName(name: string): Promise<string | null> {
        let val = await this.usersRepository
            .createQueryBuilder("user")
            .select(["user.password"])
            .where("user.name = :name", { name: name })
            .getOne();
        return val?.password;
    }

    async add(user: UserCreateDto): Promise<void> {
        await this.usersRepository.insert(user).catch();
    }
}
