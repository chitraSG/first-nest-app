
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

let ioInstance: any;

export const getIoInstance = (adapter: IoAdapter): any => {
    if (!ioInstance) {
        const ioServer = adapter.createIOServer((adapter as any).httpServer);
        ioInstance = ioServer;
    }
    return ioInstance;
};
