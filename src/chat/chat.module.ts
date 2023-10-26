import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), RoomModule, UserModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
