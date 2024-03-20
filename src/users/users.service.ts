import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { UserCreateDto } from "./user-create.dto";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { Friendship } from "./friendship.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Friendship)
        private friendshipsRepository: Repository<Friendship>
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

    async setUserPicture(name: string, picture: string) {
        console.log(`Setting picture of user: ${name} to ${picture}`);
        var user = await this.usersRepository.findOneBy({ name });
        user.picture = picture;
        await this.usersRepository.save(user);
    }

    async addFriendReq(name1: string, name2: string) {
        if (name1 == name2) throw new BadRequestException("Users are the same");
        try {
            await this.friendshipsRepository.insert({ user1: name1, user2: name2 });
        } catch (error) {
            if (error.driverError.code == "ER_NO_REFERENCED_ROW_2") {
                throw new BadRequestException("No such user");
            }
            throw error;
        }
    }
}
