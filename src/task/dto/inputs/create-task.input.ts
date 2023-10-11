import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { isNullableType } from 'graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String,{ nullable: true})
  @IsOptional()
  status?: string;

  @Field(() => Float)
  @IsNotEmpty()
  @Min(0)
  value: number;

  @Field(() => String,{ nullable: true})
  @IsOptional()
  owner?: string;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => String,{ nullable: true})
  @IsOptional()
  depending? : string;
}
