import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private model: Model<Users>) {}
  async create(createUserDto: CreateUserDto) {
    const isUser = await this.model.findOne({
      email: createUserDto.email,
    });

    if (isUser) {
      throw new BadRequestException('this Email is already registered');
    } else {
      return await this.model.create(createUserDto);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.model
      .findOne({
        email: loginUserDto.email,
      })
      .lean(true);

    if (!user) {
      throw new BadRequestException('Email not found');
    } else {
      return {
        msg: 'Login successfully',
        ...user,
      };
    }
  }

  async findAll() {
    return await this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      lean: true,
    });
  }

  async remove(id: string) {
    const user = await this.model.findById(id);
    const res = await this.model.findByIdAndDelete(id).lean(true);
    return {
      msg: `${user.email} is Deleted Succesfully`,
      ...res,
    };
  }
}
