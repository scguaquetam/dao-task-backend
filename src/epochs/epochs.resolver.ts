import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EpochsService } from './epochs.service';
import { Epoch } from './entities/epoch.entity';
import { CreateEpochInput } from './dto/create-epoch.input';
import { UpdateEpochInput } from './dto/update-epoch.input';

@Resolver(() => Epoch)
export class EpochsResolver {
  constructor(private readonly epochsService: EpochsService) {}

  @Mutation(() => Epoch)
  createEpoch(@Args('createEpochInput') createEpochInput: CreateEpochInput) {
    return this.epochsService.create(createEpochInput);
  }

  @Query(() => [Epoch], { name: 'epochs' })
  findAll() {
    return this.epochsService.findAll();
  }

  @Query(() => Epoch, { name: 'epoch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.epochsService.findOne(id);
  }

  @Mutation(() => Epoch)
  updateEpoch(@Args('updateEpochInput') updateEpochInput: UpdateEpochInput) {
    return this.epochsService.update(updateEpochInput.id, updateEpochInput);
  }

  @Mutation(() => Epoch)
  removeEpoch(@Args('id', { type: () => Int }) id: number) {
    return this.epochsService.remove(id);
  }
}
