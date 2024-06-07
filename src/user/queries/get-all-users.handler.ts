import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { GetAllUsersCommand } from './get-all-users.command';

@QueryHandler(GetAllUsersCommand)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetAllUsersCommand): Promise<User[]> {
    return await this.userRepository.find();
  }
}
