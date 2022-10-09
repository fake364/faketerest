export const selectCountryCodeId = (countryCode3: string) =>
  `SELECT "PK_ID" FROM countries_codes WHERE "ISO3"='${countryCode3}'`;
