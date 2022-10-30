import { IsNumber } from 'class-validator';

class SubscriptionPayload {
  @IsNumber()
  fromUser: number;

  @IsNumber()
  toUser: number;
}

export default SubscriptionPayload;
