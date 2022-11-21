import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CopounService } from './copoun.service';
import { Copoun } from './entities/copoun.entity';
import { CreateCopounInput } from './dto/create-copoun.input';
import { UpdateCopounInput } from './dto/update-copoun.input';

@Resolver(() => Copoun)
export class CopounResolver {
  constructor(private readonly copounService: CopounService) {}

  @Mutation(() => Copoun)
  createCopoun(@Args('createCopounInput') createCopounInput: CreateCopounInput) {
    return this.copounService.create(createCopounInput);
  }

  @Query(() => [Copoun], { name: 'copoun' })
  findAll() {
    return this.copounService.findAll();
  }

  @Query(() => Copoun, { name: 'copoun' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.copounService.findOne(id);
  }

  @Mutation(() => Copoun)
  updateCopoun(@Args('updateCopounInput') updateCopounInput: UpdateCopounInput) {
    return this.copounService.update(updateCopounInput.id, updateCopounInput);
  }

  @Mutation(() => Copoun)
  removeCopoun(@Args('id', { type: () => Int }) id: number) {
    return this.copounService.remove(id);
  }
}
