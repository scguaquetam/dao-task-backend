import { CreateBaseTaskInput } from './create-base-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBaseTaskInput extends PartialType(CreateBaseTaskInput) {
  @Field(() => Int)
  id: number;
}
