export const getValidSessionByUUid = (sessionId: string) => `
SELECT sessions.pk_id,registrations."ID" FROM users_sessions sessions LEFT JOIN registrations ON sessions.fk_user_id = registrations."ID"
        WHERE sessions.expiry_at>= NOW() AND
            sessions.pk_id='${sessionId}'
`;

const countValidSessionsById = (sessionId: string) => `
	SELECT count(*) FROM (
    ${getValidSessionByUUid(sessionId)})
                    AS valid_sessions   
	`;

export default countValidSessionsById;
