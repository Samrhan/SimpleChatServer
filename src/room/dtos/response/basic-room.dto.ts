import { ApiProperty } from '@nestjs/swagger';

export class BasicRoomDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
