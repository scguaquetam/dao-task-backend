import { Field, InputType } from "@nestjs/graphql";
import { IsEthereumAddress, IsString } from "class-validator";

@InputType()
export class LoginInput {
  
  @Field(() => String)
  @IsEthereumAddress()
  address: string;

  //TODO we should receive a wallet signature here and validate it
  // @Field(() => String)
  // @IsString()
  // signature: string;
}