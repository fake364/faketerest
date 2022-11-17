const selectUsersByString = (entry: string) => `
select * from 
(SELECT CONCAT("FIRST_NAME","LAST_NAME","USERNAME") as full_text,"ID" FROM registrations) field
     WHERE full_text LIKE '%${entry}%'
`;

export default selectUsersByString;
