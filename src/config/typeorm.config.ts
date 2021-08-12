import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  database: 'taskmanagement',
  password: '9016',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
