import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('clients') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private readonly JWT_SECRET_KEY = 'secret';

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verify(token, {publicKey:this.JWT_SECRET_KEY});
  }
  
  async createUser(user1: UserDto): Promise<User> {
    return this.userModel.create(user1);
  }

  async updateUser(id: string, updatedUser: UserDto) {
    return this.userModel.updateOne({ _id: id }, updatedUser).then(async () => {
      return await this.userModel.findOne({ _id: id });
    });
  }

  async getUser(query: string): Promise<any> {
    return this.userModel.findOne({ email: query });
  }

  async getById(id: string): Promise<any> {
    return this.userModel.findOne({ _id: id });
  }

  async getAll(): Promise<any> {
    return this.userModel.find();
  }

  async deleteAllUsers(): Promise<any> {
    return this.userModel.deleteMany();
  }

  async deleteOne(id: string): Promise<any> {
    console.log(id);
    return this.userModel.findByIdAndDelete(id);
  }
}
