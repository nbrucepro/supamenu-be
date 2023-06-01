import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuModule } from './menu/menu.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/smartmenu_db'),
    UsersModule,
    MenuModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
