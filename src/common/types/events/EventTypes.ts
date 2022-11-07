import { SubscriptionNotificationPayload } from '../../../redux/types/types';

export type Readable = { hasBeenRead: boolean };
export type CreatedAt = { createdAt: string };
export type EventType = { eventType: EVENT_TYPE };

export interface BaseEvent extends Readable, CreatedAt, EventType {}

export enum EVENT_TYPE {
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export type NotificationType = {
  key: string;
  payload: SubscriptionNotificationPayload;
};
