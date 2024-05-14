import {IsEmail, IsNotEmpty, IsString, IsNumber, } from 'class-validator';

export class addUser{
     @IsString()
     @IsNotEmpty()
     name: string;

     @IsNotEmpty()
     password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;
}