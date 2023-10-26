import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;
}
