import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { catchError, map } from 'rxjs';

export  class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log('Before...');


        const now = Date.now();
        const result =  next
            .handle()
            .pipe(
                map((value) => {
                    return { data: value, 'the time is': new Date()}
                }),
                catchError(err => { throw new BadRequestException('error') })
            );
        return result;
    }
}