import { NotificationType } from 'faketerest-utilities';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';
import PostCreatePayload from 'faketerest-utilities/dist/events/postCreate/types';
import getFirstLastName from '../../../utils/firstLastNameCreate/getFirstLastName';
import { SubscriptionPayload } from 'faketerest-utilities/dist/events/subscription/types';
import { PostCommentedPayload } from 'faketerest-utilities/dist/events/comment/types';

const getNameFromEvent = (payload: NotificationType['payload']) => {
  let firstName;
  let lastName;

  switch (payload.eventType) {
    case EVENT_TYPE.COMMENT:
      const commented = payload as PostCommentedPayload;
      firstName = commented.fromFirstname;
      lastName = commented.fromLastname;
      break;
    case EVENT_TYPE.SUBSCRIPTION:
      const subscription = payload as SubscriptionPayload;
      firstName = subscription.fromFirstname;
      lastName = subscription.fromLastname;
      break;
    case EVENT_TYPE.POST_CREATE:
      const postCreated = payload as PostCreatePayload;
      firstName = postCreated.authorFirstname;
      lastName = postCreated.authorLastName;
      break;
  }
  return { firstName, lastName };
};

export const getSnackText = (payload: NotificationType['payload']) => {
  let snackText;

  const { firstName, lastName } = getNameFromEvent(payload);
  const fullName = getFirstLastName(firstName, lastName);
  switch (payload.eventType) {
    case EVENT_TYPE.POST_CREATE:
      snackText = `${fullName} has just posted image, look`;
      break;
    case EVENT_TYPE.SUBSCRIPTION:
      snackText = `${fullName} has just subscribed to you`;
      break;
    case EVENT_TYPE.COMMENT:
      snackText = `${fullName} has just left a comment under your post`;
      break;
  }
  return snackText;
};
