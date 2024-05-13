import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

let users = [];
@Injectable()
export class UserService{
    
    constructor(
        
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){} 
    // add user
    async addUser(body):Promise<any> {
        //users.push(body);
        const newUser = this.usersRepository.create(body);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    //update user
    updateUser(body):any {
        const user = users.findIndex(user => user.id === body.id);
        users[user] = body;
        return users;
    }
    //delete user
    deleteUser(userId):any {
         users = users.filter(user => user.id !== +userId)
        return users;
    }

    //get all user 
    findAll():any {
        return users;
    }

    findOne(userId: number): any {
        console.log(users, 'usersusersusersusers')
        const user = users.find(user => user.id === +userId);
        return user;
    }
    
    findByName(name: string): any {
        console.log(name, 'name name name')
        const user = this.usersRepository.findOne({ where: { name } });
        return user;
    }
}