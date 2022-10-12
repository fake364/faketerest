const deleteSessionById = (sessionId: string) =>
  `DELETE FROM users_sessions WHERE pk_id='${sessionId}'`;

export default deleteSessionById;
