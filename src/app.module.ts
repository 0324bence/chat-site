import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "127.0.0.1",
            port: 3306,
            username: "user",
            password: "pass",
            database: "chat-site",
            synchronize: true,
            entities: [User]
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
