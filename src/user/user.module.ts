import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { SocketService } from '../socket.service'; // import SocketService
import { UserRepository } from './user.repository';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id.handler';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository]), CqrsModule],
  providers: [CreateUserHandler, SocketService, UserRepository,UpdateUserHandler,DeleteUserHandler, GetUserByIdHandler],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}