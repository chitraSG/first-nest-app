declare module 'socket.io-mock' {
    export class Socket {
      // Add the methods and properties you need from the Socket class
      emit: (event: string, ...args: any[]) => void;
      on: (event: string, fn: Function) => void;
    }
  }