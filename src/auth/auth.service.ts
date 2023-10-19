import { Injectable } from '@nestjs/common';

import { SignUpInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

  ) {}

  async signUp(signUpInput: SignUpInput) : Promise<AuthResponse> {
    try {
      const user = await this.usersService.create(signUpInput);
      //TODO create token
  
      const token = 'token';
  
      return {
        token,
        user
      }
    } catch (error) {
      throw error;
    }
    
  }
  async loginOrSignUp(signUpInput: SignUpInput) : Promise<AuthResponse> {
    try {
      const user = await this.usersService.create(signUpInput);
      //TODO create token
  
      const token = 'token';
  
      return {
        token,
        user
      }
    } catch (error) {
      throw error;
    }
  }
  async login(loginInput: LoginInput) : Promise<AuthResponse> {
    try {
      // //TODO create token
      
      const user = await this.usersService.findOneByAddress(loginInput.address);
      const token = 'token';
      return {
        token,
        user
      }
    } catch (error) {
      throw error;
    }
  }
}
