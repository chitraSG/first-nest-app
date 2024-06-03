import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserHandler } from './queries/get-user.handler'
import { SocketService } from '../socket.service'; // import SocketService

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [UsersService, CreateUserHandler, GetUserHandler, SocketService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}