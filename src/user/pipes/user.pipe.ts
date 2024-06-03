import { PipeTransform, ArgumentMetadata, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserPipeValidation implements PipeTransform {
    transform(value: number, metadata: ArgumentMetadata) {
        
        if (value === 5 || typeof value !== 'number') {
            console.log(value,'chitra mmmmm')
            throw new BadRequestException('value should not be 5');
        }
        
        return value; // Add a return statement here
    }
}