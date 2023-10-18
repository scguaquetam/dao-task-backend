import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { SignUpInput } from 'src/auth/dto/inputs/signUp.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { nickName: signUpInput.nickname },
      });
      if (existingUser) {
        throw new Error('NickName already in use.');
      }

      const existingAddress = await this.userRepository.findOne({
        where: {address: signUpInput.address},
      });
      if (existingAddress) {
        throw new Error('Address already in use.');
      }

      const newUser = this.userRepository.create(signUpInput);
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  async findOneByAddress(address: string) : Promise<User> {
    try {
      return this.userRepository.findOneByOrFail({address})
    } catch (error) {
      this.handleDBError(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string): Promise<User> {
    throw new Error('block Method not implemented.');
  }
  private handleDBError(error: any) : never {
    if (error.code === '23505') {
      throw new ConflictException('Address already in use.');
    } else {
      this.logger.error(error);
      throw new InternalServerErrorException('please check logs');
    }
  } 
}
