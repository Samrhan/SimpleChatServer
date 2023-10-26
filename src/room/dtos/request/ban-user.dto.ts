import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ description: "L'utilisateur actuel du site" })
  userId: string;
}
