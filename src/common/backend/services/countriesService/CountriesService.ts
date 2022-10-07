import { ConnectionService } from '../Connection';

export class CountriesServiceClass extends ConnectionService {
  public static instance: CountriesServiceClass;

  constructor() {
    super();
    if (CountriesServiceClass.instance) {
      return CountriesServiceClass.instance;
    }
  }


}
