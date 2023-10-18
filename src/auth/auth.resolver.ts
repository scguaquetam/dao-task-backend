import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SignUpInput,LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }
  @Mutation(() => AuthResponse, { name: 'loginOrSignUp' })
  async loginOrSignUp(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return await this.authService.loginOrSignUp(signUpInput);
  }
  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ) : Promise<AuthResponse> {
    return await this.authService.login(loginInput);
  }

  // @Query(() => String, { name: 'reValidate' })
  // async revalidateToken () : Promise<string> {
  //   return ;
  // }
}
