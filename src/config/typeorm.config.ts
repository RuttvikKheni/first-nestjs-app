import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { get } from 'config';
const dbConfig = get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  database: dbConfig.database,
  password: dbConfig.password,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: dbConfig.synchronize,
};
