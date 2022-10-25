export const selectCommentsByPostIdQuery = (postId: string) => `
SELECT text as comment_text,registrations."FIRST_NAME",registrations."LAST_NAME",registrations."ID" as user_id, registrations."USERNAME",posts_comments.fk_post_id,
	posts_comments.create_date
	FROM public.posts_comments LEFT JOIN public.registrations ON 
        registrations."ID" = posts_comments.fk_author_user_id
            WHERE posts_comments.fk_post_id='${postId}'
            	ORDER BY posts_comments.create_date
`;
