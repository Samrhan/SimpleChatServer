import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity) userRepository: Repository<UserEntity>;
  async createUser(username: string) {
    const existingUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userRepository.save({ username });
    return { username: newUser.username, id: newUser.id };
  }

  async findUserById(id: string, withRooms = false) {
    const relations = [];
    if (withRooms) {
      relations.push('rooms');
    }
    const user = await this.userRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
