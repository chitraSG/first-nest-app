import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async signIn(
    name: any,
    password: string,
  ): Promise<{ access_token: string }> {
    // const user = await this.usersService.findByName(name);
    // console.log(user, password, 'passsss')
    // if (user?.password !== password) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { sub: user.userId, username: user.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
     return {
      access_token: '1234',
    };
  }
}