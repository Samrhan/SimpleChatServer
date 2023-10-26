import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roomName: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  @ApiProperty()
  creatorId: string;
}
