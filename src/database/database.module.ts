import { Module } from "@nestjs/common";
import { PostgresService } from "./database.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [User],
                synchronize: true, // for dev only
            })
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [PostgresService],
    exports: [PostgresService, TypeOrmModule],
})
export class DatabaseModule{}