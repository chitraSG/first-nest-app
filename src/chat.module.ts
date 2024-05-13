import { Module } from '@nestjs/common';
import { Feature3Module } from './feature3.module';

@Module({
  imports: [Feature3Module],
  controllers: [],
  providers: [],
})
export class ChatModule {
  constructor(){
    console.log('chat created');
  }
}
