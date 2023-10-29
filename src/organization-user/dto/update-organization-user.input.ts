import { CreateOrganizationUserInput } from './create-organization-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationUserInput extends PartialType(CreateOrganizationUserInput) {
  @Field(() => Int)
  id: number;
}
