import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageEntity } from './entities/message.entity';
import { MessageDto } from './dtos/response/message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const roomId = client.handshake.headers.roomid as string;
    if (roomId) {
      this.joinRoom(client, roomId);
    }
  }
  sendNewMessageToRoom(message: MessageEntity) {
    this.server.to(message.room.id).emit('chat', <MessageDto>{
      id: message.id,
      content: message.content,
      user: message.user,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    });
  }

  sendMessageEditToRoom(message: MessageEntity) {
    this.server.to(message.room.id).emit('edit', <MessageDto>{
      id: message.id,
      content: message.content,
      user: message.user,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    });
  }

  private joinRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }

  sendDeleteMessageToRoom(message: MessageEntity) {
    this.server.to(message.room.id).emit('delete', message.id);
  }
}
