import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ValidPrimaryRol } from 'src/auth/enums/valid-primaryRol.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => [ValidRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];


  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @Field(() => ValidPrimaryRol, { nullable: true })
  @IsString()
  @IsNotEmpty()
  primaryRol?: ValidPrimaryRol;
}
