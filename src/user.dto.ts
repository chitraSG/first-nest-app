import {IsEmail, IsNotEmpty, IsString, IsNumber, } from 'class-validator';

export class addUser{
    @IsNumber()
    @IsNotEmpty()
     id : number;

     @IsString()
     @IsNotEmpty()
     name: string;

     @IsNotEmpty()
     password: string;
}