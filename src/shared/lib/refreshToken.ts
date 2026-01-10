import axios from 'axios';
import { getTokens, setTokens, clearTokens } from './tokens/getTokens';

export async function refreshAccessToken(): Promise<string> {
  try {
    const tokens = getTokens();
    
    if (!tokens.access_token) {
      throw new Error('No token to refresh');
    }

    const response = await axios.post('https://ib.mrbelka12000.com/auth/refresh', {
      token: tokens.access_token.replace('Bearer ', '')
    });

    const newToken = response.data.token;
    setTokens(newToken);
    
    return `Bearer ${newToken}`;
  } catch (error) {
    clearTokens();
    throw error;
  }
}