import { HEALTH_API } from '../../shared/environment';
import { API } from '../../shared';

export class HealthApi extends API {
    constructor() {
      super(HEALTH_API.API_BASE_URL, null, null);
    }
  
    fetch(query) {
      return super.fetch(HEALTH_API.API_BASE_URL, null, `${query}`);
    }
  
    getInfo(country) {
      return this.fetch(`/cases?country=${country}`);
    }
}
