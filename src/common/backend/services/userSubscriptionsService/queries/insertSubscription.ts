const insertSubscription = (fromUserId: number, toUserId: number) => `
INSERT INTO public.users_subscriptions(
	fk_from_user, fk_to_user)
		VALUES (${fromUserId}, ${toUserId});
`;

export default insertSubscription;
