import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestrauntService } from './restraunt.service';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
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

  @Query(() => [Restraunt], { name: 'restrauntFindAll' })
  async findAll() {
    return this.restrauntService.findAll();
  }

  @Query(() => [Restraunt], { name: 'findByZip' })
  findBasedOnZipCode(@Args('zip') zip: number) {
    return this.restrauntService.findBasedOnZipCode(zip);
  }
  @Query(() => MenuItem, { name: 'getMenu' })
  getRestrauntMenu(@Args('id') id: string) {
    return this.restrauntService.getMenu(id);
  }

  // @Mutation(() => Restraunt)
  // updateRestraunt(
  //   @Args('updateRestrauntInput') updateRestrauntInput: UpdateRestrauntInput,
  // ) {
  //   return this.restrauntService.update(updateRestrauntInput.id);
  // }
  @Mutation(() => Restraunt)
  removeRestraunt(@Args('id', { type: () => String }) id: number) {
    return this.restrauntService.remove(id);
  }
}
