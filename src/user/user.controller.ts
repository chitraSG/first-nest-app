import { HttpException, Controller, Get, Post, Put, Delete, Param, Req, HttpCode, HttpStatus, Res, Header, Redirect, HostParam, Body, Inject, BadRequestException, UseFilters, UseGuards, UseInterceptors, ParseIntPipe, Query, UsePipes, DefaultValuePipe} from '@nestjs/common';
import { UsersService } from './user.service'
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';
import { IdException } from './commands/exception/id.exception'; 
import { catchError } from 'rxjs';
import { IdExceptionFilter } from './commands/exception/id.exception.filter';
import { UserGaurd } from './user.guard';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UserPipeValidation } from './pipes/user.pipe';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserHandler } from './queries/get-user.handler';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUserQuery } from './queries/get-user.query';
import { SocketService } from '../socket.service';

@Controller('user')
///@UseFilters(IdExceptionFilter)
export class UserController{

    constructor(
        private readonly userService: UsersService,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly socketService: SocketService
    
        // @Inject('APP_NAME') private appName: string,
        // @Inject('APP_ARRAY') private appArray: string[],
        // @Inject('APP_OBJECT') private appObject: object,
        // @Inject('App_Mode') private appMode: string
    ) {
        //console.log(appName, appArray, appObject, appMode, 'appNameappNameappName')
    }
    // add user
    @Post('')
   // @UseInterceptors(UserInterceptor)
    //@UseGuards(new UserGaurd())
    async createUser(@Body() createUserDto:CreateUserDto):Promise<any>  {
        const { name, password } = createUserDto;
        return this.commandBus.execute(new CreateUserCommand(name, password));

    }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
      return this.queryBus.execute(new GetUserQuery(userId));
    }

    @Get()
    handleGetRequest(): string {
        return 'Hello World!';
    }

    // Example of emitting an event
    @Get('emit-event')
    emitEvent(): void {
        const io = this.socketService.getIoInstance();
        io.emit('custom-event', 'Hello from the server!');
    }

    // //update user
    // @Put('/update/:id')
    // async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto):Promise<any> {
    //     console.log(id, 'idididid')
    //     const res = await this.userService.updateUser(id, body);
    //     return res
    // }
    // //delete user
    // @Delete('/delete/:id')
    // async deleteUser(@Param('id') id):Promise<any> {
    //     return this.userService.deleteUser(id);
    // }

    // //get all user 
    // @Get('/all')
    // async findAllUser() {
    //     console.log('result', 'resultresultresultresult')
    //     return this.userService.getUser();
        
    // }

    // @Get(':userId')
    // //@UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
    // findOne(@Param('userId') userId: number, @Query("increment", UserPipeValidation) inc:number): any {
       
    //     console.log( inc, 'incincinc 11')
    //     // if(userId <= 0){
    //     //     //------------------Exception filter-------------------
    //     //     //throw new error() // Unregonized error
    //     //     //throw new HttpException('Id is not vaild', HttpStatus.BAD_REQUEST) // Bad Request error
    //     //     //throw new BadRequestException({message:'Id is not vaild', error:'error hai'}) // Bad Request error

    //     //     //--------------Custom Exception filter----------------
    //     //     throw new IdException('chitra get detail')

    //     // }
    //     return this.userService.getOne(userId);
    // }

}