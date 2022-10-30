const clearExpiredSessions = () =>
  'DELETE FROM users_sessions WHERE users_sessions.expiry_at<now()';

export default clearExpiredSessions;
