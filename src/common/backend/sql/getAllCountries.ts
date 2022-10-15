export const getAllCountriesQuery = (locale = 'en-GB') =>
  `SELECT codes."ISO3",countries_labels."label" FROM countries_codes codes LEFT JOIN countries_labels ON countries_labels.fk_codes = codes."PK_ID" WHERE locale='${locale}' `;
