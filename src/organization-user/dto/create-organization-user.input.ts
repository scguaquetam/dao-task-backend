import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrganizationUserInput {
  @Field(() => String)
  @IsNotEmpty()
  role: string;

  @Field(() => String)
  @IsNotEmpty()
  nickname: string;
}
