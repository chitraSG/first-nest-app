import { ExceptionFilter, Catch, ArgumentsHost} from '@nestjs/common';
import { IdException } from './id.exception';

@Catch()
export class IdExceptionFilter implements ExceptionFilter {
    catch(exception: IdException, host: ArgumentsHost) {
        
        const body ={
            message: exception.message,
            error: 'Id is not vaild 11',
        }

       const ctx =  host.switchToHttp();
       const response = ctx.getResponse();
       const request = ctx.getRequest();

       response.status(400).json(body); 
    }
}