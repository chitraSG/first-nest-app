import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserHandler } from './queries/get-user.handler'

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [UsersService, CreateUserHandler, GetUserHandler],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}