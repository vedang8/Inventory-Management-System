import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow requests from any frontend
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  sendLowStockAlert(product: any) {
    this.server.emit('lowStockAlert', {
      id: product.id,
      product_name: product.product_name,
      quantity: product.quantity,
      message: `⚠️ Warning: Stock is running low!`
    });
  }
}

