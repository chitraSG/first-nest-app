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
    async updateUser(id, body): Promise<any> {
       
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await this.usersRepository.update(id, body);
        //const result = await this.usersRepository.findOne(body.id);
        return true;
    }
    //delete user
    deleteUser(id):any { 
        return this.usersRepository.delete(id);;
    }

    //get all user 
    findAll():any {
        return users;
    }

    findOne(id: number): any {
        console.log(users, 'usersusersusersusers')
        const user = this.usersRepository.findOne({ where: { id } });
        return user;
    }
    
    findByName(name: string): any {
        console.log(name, 'name name name')
        const user = this.usersRepository.findOne({ where: { name } });
        return user;
    }
}