import { IsString, IsUUID } from 'class-validator';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;

}
