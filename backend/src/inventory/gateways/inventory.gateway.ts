import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enables CORS for frontend connection
export class InventoryGateway {
  @WebSocketServer()
  server: Server;

  // Emit low-stock alert event to all connected clients
  sendLowStockAlert(product: any) {
    this.server.emit('lowStockAlert', product);
  }
}
