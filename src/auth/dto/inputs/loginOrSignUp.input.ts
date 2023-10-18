import { Field, InputType } from "@nestjs/graphql";
import { IsEthereumAddress, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class LoginOrSignUpInput {
  
  @Field(() => String)
  @IsEthereumAddress()
  address: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  nickname: string;

}