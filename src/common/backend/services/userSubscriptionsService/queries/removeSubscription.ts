const removeSubscription = (fromUser: number, toUser: number) =>
  `DELETE FROM public.users_subscriptions WHERE users_subscriptions.fk_from_user=${fromUser} AND users_subscriptions.fk_to_user=${toUser};`;

export default removeSubscription;
