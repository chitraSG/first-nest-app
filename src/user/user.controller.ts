import { HttpException, Controller, Get, Post, Put, Delete, Param, Req, HttpCode, HttpStatus, Res, Header, Redirect, HostParam, Body, Inject, BadRequestException, UseFilters, UseGuards, UseInterceptors, ParseIntPipe, Query, UsePipes, DefaultValuePipe} from '@nestjs/common';
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
import { CreateUserCommand } from './commands/create-user.command';
import { SocketService } from '../socket.service';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command'; 
import { GetUserByIdQuery } from './queries/get-user-by-id.query'; 
import { GetAllUsersCommand } from './queries/get-all-users.command';
@Controller('user')
///@UseFilters(IdExceptionFilter)
export class UserController{

    constructor(
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
    async createUser(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
        const command = new CreateUserCommand(userDto);
        return await this.commandBus.execute(command);
      }

      @Put(':id')
      async updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto): Promise<UpdateUserDto> {
        const command = new UpdateUserCommand(id, userDto); // Create an instance of the update user command
        return await this.commandBus.execute(command);
      }
    
      @Delete(':id') // Add the delete user endpoint
        async deleteUser(@Param('id') id: number): Promise<any> {
            const command = new DeleteUserCommand(id); // Create an instance of the delete user command
            await this.commandBus.execute(command);
      }

      @Get(':id') // Add the get user by ID endpoint
        async getUserById(@Param('id') id: number): Promise<any> {
            const query = new GetUserByIdQuery(id); // Create an instance of the get user by ID command
            return await this.queryBus.execute(query); // Execute the query using QueryBus
        }

        @Get() // Add the getAllUsers endpoint
        async getAllUsers(): Promise<any[]> {
            const query = new GetAllUsersCommand(); // Create an instance of the getAllUsers command
            return await this.queryBus.execute(query); // Execute the query using QueryBus
        }

    
        //Socket api
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