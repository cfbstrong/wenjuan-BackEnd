import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel) {}

  //注册用户
  async create(userInfo: CreateUserDto) {
    const user = new this.userModel(userInfo);
    return await user.save();
  }
  //登录
  async findOne(username: string, password: string) {
    return await this.userModel.findOne({ username, password });
  }
}
