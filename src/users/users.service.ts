import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCreateDto } from "./user-create.dto";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

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

    async getPassHashByName(name: string): Promise<string | null> {
        let val = await this.usersRepository
            .createQueryBuilder("user")
            .select(["user.passwordHash"])
            .where("user.name = :name", { name: name })
            .getOne();
        return val?.passwordHash;
    }

    async add(user: UserCreateDto): Promise<void> {
        let passHash = await bcrypt.hash(user.password, 10);
        let toAdd = { ...user, passwordHash: passHash };

        await this.usersRepository.insert(toAdd).catch();
    }
}
