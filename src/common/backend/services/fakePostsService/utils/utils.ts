export type FakePostPayload = {
  title?: string;
  description?: string;
  fk_user_id: number;
  FIRST_NAME: string;
  LAST_NAME?: string;
  USERNAME: string;
};

export const isPostInstance = (obj: unknown): obj is FakePostPayload => {
  const userPayload = obj as FakePostPayload;
  const isStringValid = (value: unknown) =>
    typeof value === 'undefined' || typeof value === 'string' || value === null;

  return (
    isStringValid(userPayload.title) &&
    isStringValid(userPayload.description) &&
    typeof userPayload.fk_user_id === 'string' &&
    !isNaN(Number(userPayload.fk_user_id)) &&
    isStringValid(userPayload.LAST_NAME) &&
    typeof userPayload.FIRST_NAME === 'string' &&
    typeof userPayload.USERNAME === 'string'
  );
};
