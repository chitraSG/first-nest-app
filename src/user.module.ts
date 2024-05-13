import { Module, Inject } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class UserModule {
  constructor(){

    console.log('User created');
  }
}
