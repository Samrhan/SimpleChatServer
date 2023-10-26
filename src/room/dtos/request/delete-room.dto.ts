import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoomDto {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
