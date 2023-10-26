import { UserDto } from '../../../user/dtos/response/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
