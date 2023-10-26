import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ChatModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
