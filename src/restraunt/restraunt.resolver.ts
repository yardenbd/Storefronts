import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestrauntService } from './restraunt.service';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { CreateCopounInput } from 'src/copoun/dto/create-copoun.input';

@Resolver(() => Restraunt)
export class RestrauntResolver {
  constructor(private readonly restrauntService: RestrauntService) {}

  @Mutation(() => Restraunt)
  createRestraunt(
    @Args('createRestrauntInput', { type: () => CreateRestrauntInput })
    createRestrauntInput: CreateRestrauntInput,
  ) {
    return this.restrauntService.create(createRestrauntInput);
  }
  @Mutation(() => Restraunt, { name: 'updateRestraunt' })
  updateRestraunt(
    @Args('updateRestrauntInput', { type: () => CreateRestrauntInput })
    updateRestrauntInput: UpdateRestrauntInput,
  ) {
    return this.restrauntService.update(updateRestrauntInput);
  }
  @Mutation(() => Restraunt, { name: 'removeRestraunt' })
  removeRestraunt(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.remove(id);
  }

  @Query(() => [Restraunt], { name: 'restrauntFindAll' })
  findAll() {
    return this.restrauntService.findAll();
  }

  @Query(() => [Restraunt], { name: 'findByZip' })
  findBasedOnZipCode(@Args('zip', { type: () => Number }) zip: number) {
    return this.restrauntService.findBasedOnZipCode(zip);
  }
  @Query(() => [MenuItem], { name: 'getMenu' })
  getRestrauntMenu(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.getMenu(id);
  }
  @Query(() => Restraunt, { name: 'findOneRestraunt' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.findOne(id);
  }
  @Mutation(() => Boolean)
  createCopoun(
    @Args('CreateCouponInput') createCouponInput: CreateCopounInput,
  ) {
    return this.restrauntService.createCoupon(createCouponInput);
  }
  @Query(() => [Number], { name: 'FindAllCoupons' })
  findAllCouons() {
    return this.restrauntService.findAllCoupons();
  }
}
