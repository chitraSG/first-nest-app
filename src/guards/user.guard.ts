import { CanActivate, Injectable } from "@nestjs/common";

@Injectable()   
export class UserGaurd  implements CanActivate {
    private key = '123456';
    canActivate(context: any): boolean {
        console.log('UserGaurd 88888')
        const request = context.switchToHttp().getRequest();
        const key = request.headers.key;
        console.log(key, 'keykeykeykeykeykeykeykey')
        if(key === undefined) return false;
        return key === this.key;
    }
}