import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findByName(name: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { name } });
  }

  async createUser(name: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.password = password;
    return this.repository.save(user);
  }

  async findUser(userId: number): Promise<User> {
    return this.repository.findOne({ where: { id: userId } });
  }

  async deleteUser(userId: number): Promise<any> {
    const deletedUser =  this.repository.delete(userId);
    return deletedUser;
  }
}