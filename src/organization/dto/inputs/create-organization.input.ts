import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUrl, MinLength } from 'class-validator';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string; 

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  img?: string; 
}
