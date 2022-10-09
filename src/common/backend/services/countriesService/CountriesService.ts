import { ConnectionService } from '../Connection';
import { getAllCountriesQuery } from '../../sql/getAllCountries';

export class CountriesServiceClass extends ConnectionService {
  public static instance: CountriesServiceClass;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CountriesServiceClass();
    }
    return this.instance;
  }

  constructor() {
    super();
  }

  getAvailableCountriesList = async (locale = 'en-GB') => {
    const res = await this.connection.query(getAllCountriesQuery(locale));
    if (res[0].length === 0) {
      throw new Error('No countries were found');
    }
    return res[0].map(({ ISO3, label }) => ({ code: ISO3, label }));
  };
}

const CountriesService = CountriesServiceClass.getInstance();

export default CountriesService;
