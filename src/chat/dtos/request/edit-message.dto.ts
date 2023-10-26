import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditMessageDto {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  messageId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
