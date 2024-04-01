import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Friendship } from "./users/friendship.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MessagesService } from "./messages/messages.service";
import { MessagesController } from "./messages/messages.controller";
import { MessagesModule } from "./messages/messages.module";
import { Message } from "./messages/message.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>("DB_HOST"),
                port: configService.get<number>("DB_PORT"),
                username: configService.get<string>("DB_USER"),
                password: configService.get<string>("DB_PASS"),
                database: configService.get<string>("DB_TABLE"),
                synchronize: true,
                entities: [User, Friendship, Message]
            }),
            inject: [ConfigService]
        }),
        UsersModule,
        AuthModule,
        MessagesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
