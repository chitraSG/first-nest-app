

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from './create-user.command';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserDto> {
    const { createUserDto } = command;
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return createUserDto;
  }
}