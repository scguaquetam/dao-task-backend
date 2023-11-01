import { InputType, Int, Field, Float, ID } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ValidTaskStatus } from '../enums/valid-taskStatus.enum';

@InputType()
export class CreateBaseTaskInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  category: string;

  @Field(() => Float)
  @IsNotEmpty()
  @Min(0)
  value: number;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => String,{ nullable: true})
  @IsOptional()
  depending? : string;

  @Field(() => String,{ nullable: true})
  @IsOptional()
  priority? : string;

  @Field(() => ID)
  @IsUUID()
  organizationId: string;

  
}
