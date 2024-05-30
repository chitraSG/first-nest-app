import { HttpException, Controller, Get, Post, Put, Delete, Param, Req, HttpCode, HttpStatus, Res, Header, Redirect, HostParam, Body, Inject, BadRequestException, UseFilters, UseGuards, UseInterceptors, ParseIntPipe, Query, UsePipes, DefaultValuePipe} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../service/user.service'
import { Request, Response } from 'express';
import { addUser, UpdateUserDto } from '../dto/user.dto';
import { error } from 'console';
import { IdException } from '../exception/id.exception'; 
import { catchError } from 'rxjs';
import { IdExceptionFilter } from '../exception/id.exception.filter';
import { UserGaurd } from '../guards/user.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserPipeValidation } from '../pipes/user.pipe';
import { User } from '../entity/user.entity';    
import { ApiBody } from '@nestjs/swagger';
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
   // @UseInterceptors(UserInterceptor)
    //@UseGuards(new UserGaurd())
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
    async addUser(@Body() body:addUser):Promise<any>  {
       const res =  await this.userService.addUser(body);
        return res
    }

    //update user
    @Put('/update/:id')
    //@ApiBody({ type: User, description: 'Update user data' }) //the swagger when make from  entity
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.'})
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto):Promise<any> {
        console.log(id, 'idididid')
        const res = await this.userService.updateUser(id, body);
        return res
    }
    //delete user
    @Delete('/delete/:id')
    async deleteUser(@Param('id') id:string):Promise<any> {
        return this.userService.deleteUser(id);
    }

    //get all user 
    @Get('/all')
    async findAllUser() {
        console.log('result', 'resultresultresultresult')
        return this.userService.findAll();
        
    }

    @Get(':userId')
    //@UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
    findOne(@Param('userId') userId: number, @Query("increment", UserPipeValidation) inc:number): any {
       
        console.log( inc, 'incincinc 11')
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