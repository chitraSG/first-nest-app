import { Server } from 'socket.io';
import { io, Socket } from 'socket.io-client';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('SocketService', () => {
  let serverSocket: Server;
  let clientSocket: Socket;

  beforeAll((done) => {
    const httpServer = createServer();
    serverSocket = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address() as AddressInfo;
      clientSocket = io(`http://localhost:${port}`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    serverSocket.close();
    clientSocket.close();
  });

  it('should emit a custom event when requested', (done) => {
    const testMessage = 'Test message from server';
    clientSocket.on('custom-event', (data) => {
      expect(data).toBe(testMessage);
      done();
    });

    // Emit a custom event
    serverSocket.emit('custom-event', testMessage);
  });
});