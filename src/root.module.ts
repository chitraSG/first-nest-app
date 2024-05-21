import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService from @nestjs/config
import * as fs from 'fs';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';

const IS_DEV_MODE = false;
@Module({
  imports: [
    //---------First way to connect to database----
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5433,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [__dirname + '/./entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    //---------Third way to connect to database----
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule.forRoot({
    //   })],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: configService.get('DB_TYPE') as any, 
    //       host: configService.get('DB_HOST'),
    //       port: +configService.get<number>('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get<string>('DB_DATABASE'),
    //       entities: [User],
    //       synchronize: configService.get<boolean>('DB_SYNC'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    UserModule, AuthModule
  ],
  controllers: [],
  providers: [ 
    // {provide: 'APP_NAME', useValue: 'NestJS'},
    // {provide: 'APP_ARRAY', useValue: ['test']}, 
    // {provide: 'APP_OBJECT', useValue:{name: 'test', age: 20}},
    // {
    //   provide: 'App_Mode',
    //   useFactory: (LIMIT:number) => {
    //     const appMode =   IS_DEV_MODE ? `Yes this is dev  mode ${LIMIT}` : `Yes this is not dev  mode ${LIMIT}`;
    //     return appMode;
    //   },
    //   inject: ['LIMIT'],
    // },
    // {
    //   provide: 'LIMIT',
    //   useValue: IS_DEV_MODE ? '1' : '2'
     
    // }
  
  ],
  exports: [],
})
export class RootModule {
  constructor(){
    console.log('AppModule created');
    // const ormconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../ormconfig.json'), 'utf8'));
    // console.log(ormconfig);
  }
}
