export type SelectPostsSettings = {
  limit?: number;
  offset?: number;
};

const selectAllPostsQuery: (settings: SelectPostsSettings) => string = (settings = {}) => `
SELECT title, description, pk_id
	FROM public.fake_posts
	${settings.limit ? `LIMIT ${settings.limit}` : ''}
		${settings.offset ? `OFFSET ${settings.offset}` : ''}
`;

export default selectAllPostsQuery;
