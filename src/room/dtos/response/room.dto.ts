import { UserDto } from '../../../user/dtos/response/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner: UserDto;
  @ApiProperty()
  users: UserDto[];
}
