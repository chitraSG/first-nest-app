import { Injectable } from "@nestjs/common";

let users = [];
@Injectable()
export class UserService{
    // add user
    addUser(body):any {
        users.push(body);
        return users;
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
}