const selectUserIdByUsername = (username: string) =>
  `SELECT "ID" as id FROM registrations WHERE "USERNAME"='${username}'`;

export default selectUserIdByUsername;
