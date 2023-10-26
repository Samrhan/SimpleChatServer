import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roomName: string;
}
