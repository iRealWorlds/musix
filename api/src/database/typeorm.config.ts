import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { MixedList } from "typeorm";
import { EntitySchema } from "typeorm/entity-schema/EntitySchema";
import { join } from "path";

export class TypeOrmConfig implements MysqlConnectionOptions {
    readonly database: string;
    readonly host: string;
    readonly migrations: MixedList<Function | string>;
    readonly password: string;
    readonly port: number;
    readonly type: "mysql" | "mariadb";
    readonly username: string;
    readonly autoLoadEntities: boolean;
    readonly entities?: MixedList<Function | string | EntitySchema>;

    constructor(configService: ConfigService) {
        this.type = 'mariadb';
        this.host = configService.getOrThrow<string>('DB_HOST');
        this.port = configService.getOrThrow<number>('DB_PORT');
        this.username = configService.getOrThrow<string>('DB_USER');
        this.password = configService.getOrThrow<string>('DB_PASSWORD');
        this.database = configService.getOrThrow<string>('DB_NAME');
        this.migrations = [join(__dirname, 'migrations', '**', '*.{ts,js}')];
        this.entities = [join(__dirname, '..', '**', '*.entity.{ts,js}')];
        this.autoLoadEntities = true;
    }
}