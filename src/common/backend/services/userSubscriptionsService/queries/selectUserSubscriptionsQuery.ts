const selectUserSubscriptionsQuery = (userId: number) => `
SELECT fk_to_user,reg2."FIRST_NAME",reg2."LAST_NAME",reg2."USERNAME"
	FROM public.users_subscriptions 
    LEFT JOIN public.registrations as reg1 ON 
        reg1."ID" = users_subscriptions.fk_from_user
    LEFT JOIN public.registrations as reg2 ON
        reg2."ID" = users_subscriptions.fk_to_user
        WHERE fk_to_user=${userId}
`;

export default selectUserSubscriptionsQuery;
