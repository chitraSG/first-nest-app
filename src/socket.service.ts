import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private io: Server;

  constructor() {
    this.io = new Server();
    this.init();
  }

  private init(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  public getIoInstance(): Server {
    return this.io;
  }
}
