import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestrauntService } from './restraunt.service';
import { Restraunt } from './entities/restraunt.entity';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';

@Resolver(() => Restraunt)
export class RestrauntResolver {
  constructor(private readonly restrauntService: RestrauntService) {}

  @Mutation(() => Restraunt)
  createRestraunt(
    @Args('createRestrauntInput') createRestrauntInput: CreateRestrauntInput,
  ) {
    return this.restrauntService.create(createRestrauntInput);
  }

  @Query(() => [Restraunt], { name: 'restraunt' })
  findAll() {
    return this.restrauntService.findAll();
  }

  @Query(() => Restraunt, { name: 'restraunt' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restrauntService.findOne(id);
  }

  @Mutation(() => Restraunt)
  updateRestraunt(
    @Args('updateRestrauntInput') updateRestrauntInput: UpdateRestrauntInput,
  ) {
    return this.restrauntService.update(
      updateRestrauntInput.id,
      updateRestrauntInput,
    );
  }

  @Mutation(() => Restraunt)
  removeRestraunt(@Args('id', { type: () => Int }) id: number) {
    return this.restrauntService.remove(id);
  }
}
