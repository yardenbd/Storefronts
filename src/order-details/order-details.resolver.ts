import { Resolver } from '@nestjs/graphql';
import { OrderDetailsService } from './order-details.service';

@Resolver()
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}
}
