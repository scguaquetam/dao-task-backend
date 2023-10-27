import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { SignUpInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private getJwtToken(id: string): string {
    return this.jwtService.sign({ id: id })
  }
  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);
    const token = this.getJwtToken(user.id)
    return {
      token,
      user,
    };
  }
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    try {
      const user = await this.usersService.findOneByAddress(loginInput.address);
      const token = this.getJwtToken(user.id)
      return {
        token,
        user,
      };
    } catch (error) {
      throw error;
    }
  }
  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive) throw new Error('User is not active');
    
    return user;
  }
  async revalidateToken(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken(user.id)
    return {
      token,
      user,
    };
  }
}
