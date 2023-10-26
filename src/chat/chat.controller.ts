import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { PostMessageDto } from './dtos/request/post-message.dto';
import { EditMessageDto } from './dtos/request/edit-message.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageDto } from './dtos/response/message.dto';
import { DeleteMessageDTO } from './dtos/request/delete-message.dto';
import { UUIDParam } from '../shared/pipe/uuid-param.pipe';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  @Inject() chatService: ChatService;

  @Post()
  @ApiCreatedResponse({
    type: MessageDto,
    description: 'Message créé avec succès',
  })
  @ApiNotFoundResponse({
    description: "Le salon ou l'utilisateur n'existe pas",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Poste un message sur un salon' })
  async postMessage(@Body() postMessage: PostMessageDto) {
    return await this.chatService.postMessage(
      postMessage.content,
      postMessage.userId,
      postMessage.roomId,
    );
  }

  @Get(':roomId')
  @ApiResponse({
    status: 200,
    type: [MessageDto],
  })
  @ApiNotFoundResponse({
    description: "Le salon n'existe pas",
  })
  @ApiBadRequestResponse({
    description: "L'id doit être un UUID",
  })
  @ApiOperation({ summary: "Récupère la liste des messages d'un salon" })
  async getMessages(@UUIDParam('roomId') roomId: string) {
    return await this.chatService.getRoomMessage(roomId);
  }

  @Put()
  @ApiCreatedResponse({
    type: MessageDto,
    description: 'Message edité avec succès',
  })
  @ApiForbiddenResponse({
    description: "L'id de l'utilisateur n'est pas celui de l'auteur du message",
  })
  @ApiNotFoundResponse({
    description: "L'utilisateur ou le message n'existe pas",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Edite un message' })
  async editMessage(@Body() message: EditMessageDto) {
    return await this.chatService.editMessage(
      message.messageId,
      message.userId,
      message.content,
    );
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'Message supprimé avec succès' })
  @ApiForbiddenResponse({
    description:
      "L'id de l'utilisateur n'est pas celui de l'auteur du message, ou l'utilisateur n'est pas propriétaire du salon",
  })
  @ApiNotFoundResponse({
    description: "Le message ou l'utilisateur n'existe pas",
  })
  @ApiBadRequestResponse({
    description: 'Format de body invalide',
  })
  @ApiOperation({ summary: 'Supprime un message' })
  async deleteMessage(@Body() message: DeleteMessageDTO) {
    await this.chatService.deleteMessage(message.messageId, message.userId);
  }
}
