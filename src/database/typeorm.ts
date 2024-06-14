import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/user.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',

  entities: [User],
  migrations: [__dirname + './migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
});

export default dataSource;

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.DB_LOGGING === 'true',

  entities: [User],
  migrations: [__dirname + './migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

export const typeormConfig = registerAs('typeorm', () => config);
