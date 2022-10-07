const userQueryWithCountry = (
  userIdOrName: number | string,
  locale = 'en-GB'
) => {
  let finalLocale = locale;
  if (!finalLocale) {
    finalLocale = 'en-GB';
  }

  return `
	SELECT * from public.registrations reg LEFT JOIN (SELECT "PK_ID",locale,"label","ISO3" from countries_labels  
    LEFT JOIN countries_codes ON countries_labels.fk_codes=countries_codes."PK_ID"
        where locale='${finalLocale}') AS country
            ON reg."FK_COUNTRY_CODE"=country."PK_ID"
                where ${
                  typeof userIdOrName === 'string'
                    ? `reg."USERNAME"='${userIdOrName}'`
                    : `reg."ID"=${userIdOrName}`
                }
	`;
};

export default userQueryWithCountry;
