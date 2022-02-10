import axios from 'axios';
import { API_KEY } from '../constants/api';

class GetDataApi {
  async getData(API_URL) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          limit: 100
        }
      });
      return response.data.data.results
    } catch (error) {
      console.log(error.message);
      return false;
    }

  }
}

export const getDataApi = new GetDataApi();
