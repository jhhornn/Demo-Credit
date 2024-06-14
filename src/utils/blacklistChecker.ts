import axios from 'axios';
import config from '../config';
const API_KEY = config.env_var.dev.appConfig.KARMA_API_KEY || '';

export async function isBlacklisted(identity: string): Promise<boolean> {
  try {
    const url = `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`;
    const headers = {
      'Authorization': `Bearer ${API_KEY}`
    };
  
    const response = await axios.get(url, {
       headers,
       validateStatus: function (status) {
        return status < 500
       }
      });

    if (response.status === 404 && response.data.status === 'success' && response.data.message === 'Identity not found in karma') {
      return false;
    } else if (response.status === 200) {
      return true;
    } else {
      return false;
    }

    // return response.data;
  } catch (error) {
    console.error(`Error checking blacklist status for ${identity}:`);
    // console.log(error)
    // Handle the error appropriately in production
    throw new Error('Could not verify blacklist status');
  }
}
