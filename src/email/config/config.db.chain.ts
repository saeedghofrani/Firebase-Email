import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ConfigEmailLogPostgresql: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '136.243.169.68',
  port: 5432,
  username: 'postgres',
  password: 'In@FuZhZNA46uY1!',
  database : "nest" ,
  entities: [__dirname + '../entities/*.entity.js'],
  keepConnectionAlive: true,
  autoLoadEntities: true,
  synchronize: true,
};
