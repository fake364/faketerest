const selectUserSubscribersQuery = (userId: number) => `
SELECT fk_to_user,fk_from_user,reg1."FIRST_NAME",reg1."LAST_NAME",reg1."USERNAME"
	FROM public.users_subscriptions 
    LEFT JOIN public.registrations as reg1 ON 
        reg1."ID" = users_subscriptions.fk_from_user
    LEFT JOIN public.registrations as reg2 ON
        reg2."ID" = users_subscriptions.fk_to_user
        WHERE fk_to_user=${userId}
`;

export default selectUserSubscribersQuery;
