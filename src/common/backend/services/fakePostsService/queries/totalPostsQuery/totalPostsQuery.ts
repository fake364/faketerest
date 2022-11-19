const totalPostsQuery = (fromUserId?: number) =>
  `SELECT count(*) from fake_posts ${
    fromUserId ? `WHERE fk_user_id=${fromUserId}` : ''
  }`;

export default totalPostsQuery;
