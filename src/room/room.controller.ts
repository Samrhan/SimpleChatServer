import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dtos/request/create-room.dto';
import { JoinRoomDto } from './dtos/request/join-room.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomDto } from './dtos/response/room.dto';
import { BasicRoomDTO } from './dtos/response/basic-room.dto';
import { DeleteRoomDto } from './dtos/request/delete-room.dto';
import { UUIDParam } from '../shared/pipe/uuid-param.pipe';
import { BanUserDto } from './dtos/request/ban-user.dto';
@Controller('room')
@ApiTags('Room')
export class RoomController {
  @Inject() roomService: RoomService;

  @Post()
  @ApiCreatedResponse({
    type: RoomDto,
    description: 'Salon créé avec succès',
  })
  @ApiConflictResponse({
    description: 'Nom de salon déjà utilisé',
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Crée un salon' })
  async createRoom(@Body() room: CreateRoomDto) {
    return await this.roomService.createRoom(room.roomName, room.creatorId);
  }

  @Post('/join')
  @ApiCreatedResponse({
    type: RoomDto,
    description: 'Salon rejoins avec succès',
  })
  @ApiNotFoundResponse({
    description: "Le salon ou l'utilisateur n'existe pas",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Rejoins un salon' })
  async joinRoom(@Body() room: JoinRoomDto) {
    return await this.roomService.joinRoom(room.roomName, room.userId);
  }

  @Get('/user/:userId')
  @ApiResponse({
    status: 200,
    type: [BasicRoomDTO],
    description: "Récupération des salons d'un utilisateur",
  })
  @ApiNotFoundResponse({
    description: "L'utilisateur n'existe pas",
  })
  @ApiBadRequestResponse({
    description: "L'id doit être un UUID",
  })
  @ApiOperation({ summary: "Récupère la liste des salons d'un utilisateur" })
  async getRoom(@UUIDParam('userId') userId: string) {
    return await this.roomService.getUserRooms(userId);
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'Salon supprimé ou quitté',
  })
  @ApiNotFoundResponse({
    description: "Le salon ou l'utilisateur n'existe pas",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({
    summary:
      "Supprime ou quitte un salon en fonction de si l'utilisateur est propriétaire ou non",
  })
  async delete(@Body() room: DeleteRoomDto) {
    return await this.roomService.deleteRoom(room.roomId, room.userId);
  }

  @Delete('/user/:userId')
  @ApiResponse({
    status: 200,
    description: "L'utilisateur a été banni du salon",
  })
  @ApiNotFoundResponse({
    description: "Le salon ou l'utilisateur ou le propriétaire n'existe pas",
  })
  @ApiForbiddenResponse({
    description: "L'utilisateur n'est pas le propriétaire du salon",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiParam({
    name: 'userId',
    description: "L'utilisateur à bannir",
  })
  @ApiOperation({
    summary: "Banni un utilisateur d'un salon (uniquement en tant qu'admin)",
  })
  async ban(@UUIDParam('userId') userId: string, @Body() room: BanUserDto) {
    return await this.roomService.banUser(userId, room.roomId, room.userId);
  }
}
