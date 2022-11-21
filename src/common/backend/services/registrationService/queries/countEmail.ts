const countEmail = (email: string) =>
  `SELECT count(*) FROM registrations WHERE "EMAIL"='${email}'`;

export default countEmail;
