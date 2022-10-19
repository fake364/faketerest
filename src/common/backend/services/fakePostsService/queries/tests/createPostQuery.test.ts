import { createPostQuery } from '../createPostQuery';
import { uuid } from 'uuidv4';

jest.mock('uuidv4', () => ({ uuid: () => 'uuid-id-2-3-4' }));

describe('createPostQuery', function () {
  it('should create query string with supplied data', () => {
    expect(createPostQuery(uuid(), 'Title', 'Describe', 1234)).toBe(
      "INSERT INTO public.fake_posts(title, description, fk_user_id, pk_id) VALUES ('Title', 'Describe', 1234, 'uuid-id-2-3-4');"
    );
  });

  it('should create query string with some nullable data', () => {
    expect(createPostQuery(uuid(), null, null, 1234)).toBe(
      "INSERT INTO public.fake_posts(title, description, fk_user_id, pk_id) VALUES (null, null, 1234, 'uuid-id-2-3-4');"
    );
  });
});
