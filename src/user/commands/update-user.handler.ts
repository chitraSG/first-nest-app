import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserCommand } from './update-user.command';
import { User } from '../user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserDto> {
    const { id, updateUserDto } = command;
    await this.userRepository.update(id, updateUserDto);
    return updateUserDto;
  }
}