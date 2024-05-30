import {IsEmail, IsNotEmpty, IsString, IsNumber, IsBoolean, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class addUser{
    
    @ApiProperty({ description: 'The name of the user' })
     @IsString()
     @IsNotEmpty()
     name: string;

     @ApiProperty({ description: 'The password of the user' })
     @IsNotEmpty()
     password: string;

     @ApiProperty({ description: 'The status of the user' })
     @IsNotEmpty()
     @IsBoolean()
     status: boolean;
}

export class UpdateUserDto {
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The password of the user' })
     @IsNotEmpty()
     password: string;

     @ApiProperty({ description: 'The status of the user' })
     @IsNotEmpty()
     @IsBoolean()
     status: boolean;
}