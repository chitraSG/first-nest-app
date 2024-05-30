
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UsersService } from '../user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UsersService) {}

  async execute(query: GetUserQuery) {
    return this.userService.executeQuery(query);
  }
}