import { CreateEpochInput } from './create-epoch.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEpochInput extends PartialType(CreateEpochInput) {
  @Field(() => Int)
  id: number;
}
