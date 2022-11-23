import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CopounService } from './copoun.service';
import { UpdateCopounInput } from './dto/update-copoun.input';
import { CreateCopounInput } from './dto/create-copoun.input';
@Resolver()
export class CopounResolver {
  constructor(private readonly copounService: CopounService) {}

  @Mutation(() => Boolean)
  createCopoun(
    @Args('CreateCouponInput') createCouponInput: CreateCopounInput,
  ) {
    return this.copounService.create(createCouponInput);
  }

  @Query(() => [Number], { name: 'FindAllCoupons' })
  findAll() {
    return this.copounService.findAll();
  }

  @Query(() => Number, { name: 'copoun' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.copounService.findOne(id);
  }

  @Mutation(() => Number)
  updateCopoun(
    @Args('updateCopounInput') updateCopounInput: UpdateCopounInput,
  ) {
    return this.copounService.update(updateCopounInput.id, updateCopounInput);
  }

  @Mutation(() => Number)
  removeCopoun(@Args('id', { type: () => Int }) id: number) {
    return this.copounService.remove(id);
  }
}
