import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { SignUpInput } from 'src/auth/dto/inputs/signUp.input';
import { User } from './entities/user.entity';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      signUpInput.nickname = signUpInput.nickname.trim().replace(/\s+/g, ''); 

      const existingUser = await this.userRepository.createQueryBuilder("user")
        .where("LOWER(user.nickname) = LOWER(:nickname)", { nickname: signUpInput.nickname })
        .getOne();
      if (existingUser) {
        throw new Error('NickName is already in use.');
      }
      const existingAddress = await this.userRepository.findOne({
        where: {address: signUpInput.address},
      });
      if (existingAddress) {
        throw new Error('Address is already in use.');
      }
      const newUser = this.userRepository.create(signUpInput);
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBError({
        code: 'err-create',
        details: error
      });
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {

    if (roles.length === 0) {
      return this.userRepository.find();
    } else {
      return this.userRepository.createQueryBuilder("user")
        .andWhere('ARRAY[roles] && ARRAY[:...roles]')
        .setParameter('roles', roles)
        .getMany();
    }
  }

  findOne(id: string) : Promise<User>{
    throw new Error('Method not implemented.');
  }
  async findOneByAddress(address: string) : Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({address})
    } catch (error) {
      this.handleDBError({
        code: 'err-001',
        details: `${address} not found`
      });
    }
  }
  async findOneById(id: string) : Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({id})
    } catch (error) {
      this.handleDBError({
        code: 'err-001',
        details: `${id} not found`
      });
    }
  }

  async update(
    id: string, 
    updateUserInput: UpdateUserInput,
    updatedBy: User
  ) : Promise<User> {
    try {
      const user = await this.userRepository.preload({
        ...updateUserInput,
        id
      });
      user.lastUpdateBy = updatedBy
      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDBError(error)
    }
  }
  async block(id: string, adminUser : User): Promise<User> {
    const userToBlock = await this.findOneById(id);
    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;
    return await this.userRepository.save(userToBlock);
  }

  remove(id: string): Promise<User> {
    throw new Error('block Method not implemented.');
  }
  private handleDBError(error: any) : never {
    console.log(error.code);
    console.log(error.details);
    
    if (error.code === '23505') {
      throw new BadRequestException('Address already in use.');
    } else if (error.code === 'err-001') {
      throw new BadRequestException(error.details.replace('Key ', ''));
    } else if (error.code === 'err-create') {
      console.log('11', error.details);
      
      throw new BadRequestException(error.details);
    } else {
      this.logger.error(error);
      throw new InternalServerErrorException('please check logs');
    }
  } 
}
