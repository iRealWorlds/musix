import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
const TypeOrmConfig = require('./typeorm.config').TypeOrmConfig;

config({
    path: '.env.migrations'
});
config({
    path: '../.env'
});

const configService = new ConfigService();

export default new DataSource(new TypeOrmConfig(configService));