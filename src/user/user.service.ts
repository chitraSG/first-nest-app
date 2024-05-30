// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {Repository } from 'typeorm';
// import { User } from './user.entity';

// let users = [];
// @Injectable()
// export class UserService{
    
//     constructor(
        
//         @InjectRepository(User)
//         private readonly usersRepository: Repository<User>
//     ){} 
//     // add user
//     async createUser(body):Promise<any> {
//         //users.push(body);
//         const nameExist = await this.findByName(body.name)
//         if(nameExist){
//             throw new NotFoundException(`User with name ${body.name} already exist`);
//         }
//         const newUser = this.usersRepository.create(body);
//         await this.usersRepository.save(newUser);
//         return await this.usersRepository.find();
//     }

//     //update user
//     async updateUser(id, body): Promise<any> {
       
//         await this.findUser(id);
//         await this.usersRepository.update(id, body);
//         //const result = await this.usersRepository.findOne(body.id);
//         return true;
//     }
//     //delete user
//     async deleteUser(id):Promise<any> { 
//         await this.findUser(id);
//         return this.usersRepository.delete(id);;
//     }

//     //get all user 
//     async getUser():Promise<any> {
//         const result = await this.usersRepository.find();
//         return result
//     }

//     async getOne(id: number): Promise<User> {
//         await this.findUser(id);
//         const user = this.usersRepository.findOne({ where: { id } });
//         return user;
//     }
    
//     findByName(name: string): any {
//         console.log(name, 'name name name')
//         const user = this.usersRepository.findOne({ where: { name } });
//         return user;
//     }

//     async findUser(id: number): Promise<User> {
//         const user = await this.usersRepository.findOne({ where: { id } });
//         console.log(user, 'useruseruseruser')   
//         if (!user) {
//             throw new NotFoundException(`User with ID ${id} not found`);
//         }
    
//         return user;
//     }
// }

import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUserQuery } from './queries/get-user.query';

@Injectable()
export class UsersService {
  private users = [];

  executeCommand(command: CreateUserCommand) {
    const { username, email } = command;
    // Logic to create user and store it
    const newUser = { id: this.users.length + 1, username, email };
    this.users.push(newUser);
    return newUser;
  }

  executeQuery(query: GetUserQuery) {
    const { userId } = query;
    // Logic to fetch user by ID
    return this.users.find(user => user.id === parseInt(userId));
  }
}
