export const selectPostById = (postId: string) =>
  `SELECT posts.title,posts.description,posts.fk_user_id,registrations."FIRST_NAME",registrations."LAST_NAME",registrations."USERNAME" FROM public.fake_posts posts 
		LEFT JOIN public.registrations ON registrations."ID" = posts.fk_user_id WHERE pk_id='${postId}'`;
