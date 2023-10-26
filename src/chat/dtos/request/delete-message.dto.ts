import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessageDTO {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  messageId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
