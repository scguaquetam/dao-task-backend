import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEpochInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
