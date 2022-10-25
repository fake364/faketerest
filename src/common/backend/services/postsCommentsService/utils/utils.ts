type CommentEntry = {
  comment_text: string;
  FIRST_NAME: string;
  LAST_NAME?: string;
  user_id: number;
  USERNAME: string;
  fk_post_id: string;
  create_date: string;
};

export const areCommentEntries = (obj: unknown): obj is CommentEntry[] => {
  const res = obj as CommentEntry[];
  return (
    Array.isArray(res) &&
    res.every((item) => {
      return (
        typeof item.comment_text === 'string' &&
        typeof item.FIRST_NAME === 'string' &&
        (!item.LAST_NAME || typeof item.LAST_NAME === 'string') &&
        typeof item.user_id === 'string' &&
        typeof item.USERNAME === 'string' &&
        typeof item.fk_post_id === 'string'
      );
    })
  );
};
