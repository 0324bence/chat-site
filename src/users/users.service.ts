import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, QueryFailedError, Repository } from "typeorm";
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

    async searchUsersByName(search: string, onlyBeginning: boolean) {
        if (onlyBeginning) {
            return await this.usersRepository.find({
                where: { name: Like(`${search}%`) },
                order: { name: { direction: "ASC" } }
            });
        }

        return await this.usersRepository.find({
            where: { name: Like(`%${search}%`) },
            order: { name: { direction: "ASC" } }
        });
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

    async getOwnUserData(name: string): Promise<UserDto> {
        return await this.usersRepository.findOneBy({ name });
    }

    async setUserPicture(name: string, file: Express.Multer.File) {
        if (!file.mimetype.startsWith("image/")) {
            throw new BadRequestException("File has wrong MIME type");
        }

        console.log(`Setting picture of user: ${name} to ${file}`);
        let user = await this.usersRepository.findOneBy({ name });

        let data = "data:" + file.mimetype + ";base64," + file.buffer.toString("base64");
        user.picture = data;

        try {
            await this.usersRepository.save(user);
        } catch {
            throw new BadRequestException("Failed to set profile picture");
        }
    }

    async addFriendReq(name1: string, name2: string) {
        if (name1 == name2) throw new BadRequestException("Users are the same");
        try {
            await this.friendshipsRepository.insert({ user1Name: name1, user2Name: name2 });
        } catch (error) {
            if (error.driverError.code == "ER_NO_REFERENCED_ROW_2") {
                throw new BadRequestException("No such user");
            } else if (error.driverError.code == "ER_DUP_ENTRY") {
                throw new BadRequestException("Friend request already exists");
            }
            throw error;
        }
    }

    async _getFriendReq(name1: string, name2: string): Promise<Friendship | null> {
        if (name1 == name2) throw new BadRequestException("The users cannot be the same");

        let friendship = await this.friendshipsRepository
            .createQueryBuilder("friendship")
            .where("friendship.user1 = :name1 AND friendship.user2 = :name2", { name1, name2 })
            .getOne();
        return friendship;
    }

    async acceptFriendReq(name1: string, name2: string) {
        let friendship = await this._getFriendReq(name1, name2);

        if (friendship == null) throw new BadRequestException("No such friend request");
        if (friendship.accepted) throw new BadRequestException("Friend request has already been accepted");

        friendship.accepted = true;
        await this.friendshipsRepository.save(friendship);
    }

    async declineFriendReq(name1: string, name2: string) {
        let friendship = await this._getFriendReq(name1, name2);

        if (friendship == null) throw new BadRequestException("No such friend request");
        if (friendship.accepted) throw new BadRequestException("Friend request has already been accepted");

        await this.friendshipsRepository.remove(friendship);
    }

    async getIncomingFriendRequests(name: string) {
        let friendships = await this.friendshipsRepository.find({
            where: { user2Name: name, accepted: false },
            relations: ["user1"]
        });
        return friendships;
    }

    async getSentFriendRequests(name: string) {
        let friendships = await this.friendshipsRepository.find({
            where: { user1Name: name, accepted: false },
            relations: ["user2"]
        });
        return friendships;
    }

    async areFriends(user1: string, user2: string) {
        let fs1 = !!(await this.friendshipsRepository.findOneBy({ user1Name: user1, user2Name: user2 }));
        let fs2 = !!(await this.friendshipsRepository.findOneBy({ user1Name: user2, user2Name: user1 }));
        return fs1 || fs2;
    }

    async getFriends(user: string) {
        let friends1 = (
            await this.friendshipsRepository.find({
                where: { user1Name: user, accepted: true },
                relations: ["user2"]
            })
        ).map(x => x.user2);
        let friends2 = (
            await this.friendshipsRepository.find({
                where: { user2Name: user, accepted: true },
                relations: ["user1"]
            })
        ).map(x => x.user1);
        return friends1.concat(friends2);
    }
}
