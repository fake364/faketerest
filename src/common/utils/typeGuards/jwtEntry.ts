type JwtEntry = { email: string; regDate: string; exp: number };

export const isSerializedToken = (obj: unknown): obj is JwtEntry => {
  const tokenEntry = obj as JwtEntry;
  console.log();
  return (
    typeof tokenEntry?.exp === 'number' &&
    typeof tokenEntry?.email === 'string' &&
    typeof tokenEntry?.regDate === 'string'
  );
};
