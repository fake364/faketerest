const createSessionQuery = (userId: number) =>
  `INSERT INTO public.users_sessions(fk_user_id) VALUES (${userId})
		RETURNING pk_id;`;

export default createSessionQuery;
