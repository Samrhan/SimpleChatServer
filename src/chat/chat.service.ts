import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  @Inject() chatGateway: ChatGateway;
  @Inject() roomService: RoomService;
  @Inject() userService: UserService;

  @InjectRepository(MessageEntity) messageRepository: Repository<MessageEntity>;

  async postMessage(content: string, userId: string, roomId: string) {
    const user = await this.userService.findUserById(userId);
    const room = await this.roomService.findRoomById(roomId);

    const message = await this.messageRepository.save({
      content,
      user,
      room,
    });

    this.chatGateway.sendNewMessageToRoom(message);
  }

  async getRoomMessage(roomId: string) {
    const room = await this.roomService.findRoomById(roomId);
    return await this.messageRepository.find({
      where: { room },
      relations: ['user'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async editMessage(messageId: string, userId: string, content: string) {
    const message = await this.messageRepository.findOne({
      where: {
        id: messageId,
      },
      relations: ['user', 'room'],
    });
    if (!message) {
      throw new NotFoundException();
    }

    if (message.user.id !== userId) {
      throw new ForbiddenException();
    }
    message.content = content;
    const editedMessage = await this.messageRepository.save(message);
    this.chatGateway.sendMessageEditToRoom(editedMessage);
    return editedMessage;
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.messageRepository.findOne({
      where: {
        id: messageId,
      },
      relations: ['user', 'room', 'room.owner'],
    });
    if (!message) {
      throw new NotFoundException();
    }
    if (message.user.id !== userId && message.room.owner.id !== userId) {
      throw new ForbiddenException();
    }

    await this.messageRepository.delete(message.id);
    this.chatGateway.sendDeleteMessageToRoom(message);
  }
}
