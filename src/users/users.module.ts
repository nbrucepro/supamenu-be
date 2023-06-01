import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.model';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), MongooseModule.forFeatureAsync([{ name: 'clients', useFactory:()=>{
    const schema = userSchema;
    schema.pre('save',function () {
      console.log('Hello from ERP pre save')
    })
    return schema;
  } }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export default class UsersModule {}
