import { Nullable } from '../../../../types/common';

export const createPostQuery = (
  pkPostId: string,
  title: Nullable<string>,
  description: Nullable<string>,
  fkUserId: number
) =>
  `INSERT INTO public.fake_posts(title, description, fk_user_id, pk_id) VALUES (${
    title ? `'${title}'` : null
  }, ${description ? `'${description}'` : null}, ${fkUserId}, '${pkPostId}');`;