// src/users/commands/create-user.handler.ts

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UsersService } from '../user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UsersService) {}

  async execute(command: CreateUserCommand) {
    return this.userService.executeCommand(command);
  }
}
