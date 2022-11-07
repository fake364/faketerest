import { BaseEvent } from '../../common/types/events/EventTypes';

export interface SubscriptionNotificationPayload extends BaseEvent {
  toId: string;
  fromId: string;
  fromFirstname: string;
  fromLastname: string | null;
  fromUsername: string;
  toFirstname: string;
  toLastname: string | null;
  toUsername: string;
}
