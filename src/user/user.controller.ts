import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/request/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dtos/response/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  @Inject() userService: UserService;

  @Post()
  @ApiCreatedResponse({
    description: 'Utilisateur créé, ou connecté avec succès',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Crée, ou se connecte à un utilisateur' })
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user.username);
  }
}
