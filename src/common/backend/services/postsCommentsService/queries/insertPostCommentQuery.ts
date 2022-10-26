export const insertPostCommentQuery = (
  text: string,
  fkPostId: string,
  fkAuthorUserId: number
) => `
INSERT INTO public.posts_comments(
	text, fk_post_id, fk_author_user_id)
		VALUES ('${text}','${fkPostId}', ${fkAuthorUserId});`;
