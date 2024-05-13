import { HttpException, Controller, Get, Post, Put, Delete, Param, Req, HttpCode, HttpStatus, Res, Header, Redirect, HostParam, Body, Inject, BadRequestException, UseFilters, UseGuards} from '@nestjs/common';
import { UserService } from './user.service'
import { Request, Response } from 'express';
import { addUser } from './user.dto';
import { error } from 'console';
import { IdException } from './exception/id.exception'; 
import { catchError } from 'rxjs';
import { IdExceptionFilter } from './exception/id.exception.filter';
import { UserGaurd } from './user.guard';
@UseGuards(new UserGaurd())
@Controller({path:'/user', host: 'localhost' })
///@UseFilters(IdExceptionFilter)
export class UserController{

    constructor(
        private readonly userService: UserService,
        // @Inject('APP_NAME') private appName: string,
        // @Inject('APP_ARRAY') private appArray: string[],
        // @Inject('APP_OBJECT') private appObject: object,
        // @Inject('App_Mode') private appMode: string
    ) {
        //console.log(appName, appArray, appObject, appMode, 'appNameappNameappName')
    }
    // add user
    @Post('/add')
    
    async addUser(@Body() body:addUser):Promise<any>  {
        //throw new IdException('chitra add user')
       const res =  await this.userService.addUser(body);
        return res
    }

    //update user
    @Put('/update')
    updateUser(@Body() body):string {
        return this.userService.updateUser(body);
    }
    //delete user
    @Delete('/delete/:userId')
    deleteUser(@Param('userId') userId):string {
        return this.userService.deleteUser(userId);
    }

    //get all user 
    @Get('/all')
    findAllUser() {
        return this.userService.findAll();
        
    }

    @Get(':userId')
    findOne(@Param('userId') userId: number): string {
        // if(userId <= 0){
        //     //------------------Exception filter-------------------
        //     //throw new error() // Unregonized error
        //     //throw new HttpException('Id is not vaild', HttpStatus.BAD_REQUEST) // Bad Request error
        //     //throw new BadRequestException({message:'Id is not vaild', error:'error hai'}) // Bad Request error

        //     //--------------Custom Exception filter----------------
        //     throw new IdException('chitra get detail')

        // }
        return this.userService.findOne(userId);
    }

}