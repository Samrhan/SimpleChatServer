import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class RoomService {
  @Inject() userService: UserService;
  @InjectRepository(RoomEntity) roomRepository: Repository<RoomEntity>;

  async createRoom(roomName: string, creatorId: string) {
    const user = await this.userService.findUserById(creatorId);
    const existingRoom = await this.findRoomByName(roomName, false, false);
    if (existingRoom) {
      throw new ConflictException();
    }

    const room = await this.roomRepository.save({
      name: roomName,
      owner: user,
      users: [user],
    });
    return this.roomRepository.save(room);
  }

  async joinRoom(roomName: string, userId: string) {
    const user = await this.userService.findUserById(userId);
    const room = await this.findRoomByName(roomName, true);
    if (room.users.some((u) => u.id === userId)) {
      throw new ConflictException();
    }

    room.users.push(user);
    return this.roomRepository.save(room);
  }

  private async findRoomByName(
    roomName: string,
    withUsers = false,
    throwError = true,
  ) {
    const relations = [];
    if (withUsers) {
      relations.push('users');
    }
    const room = await this.roomRepository.findOne({
      where: {
        name: roomName,
      },
      relations,
    });
    if (!room && throwError) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async findRoomById(id: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id,
      },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async getUserRooms(userId: string) {
    const user = await this.userService.findUserById(userId, true);
    return user.rooms;
  }

  async deleteRoom(roomId: string, userId: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
      relations: ['owner', 'users'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.owner.id === userId) {
      await this.roomRepository.delete(room.id);
      return;
    } else {
      room.users = room.users.filter((u) => u.id !== userId);
      await this.roomRepository.save(room);
    }
  }

  async banUser(userId: string, roomId: string, ownerId: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
      relations: ['owner', 'users'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.owner.id !== ownerId) {
      throw new ForbiddenException();
    }
    room.users = room.users.filter((u) => u.id !== userId);
    await this.roomRepository.save(room);
  }
}
