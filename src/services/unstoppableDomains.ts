import axios from 'axios';

const apiKey = process.env.REACT_APP_UNSTOPPABLE_DOMAINS_API_KEY!;
const baseURL = 'https://resolve.unstoppabledomains.com';

export const resolveDomain = async (domain: string) => {
  try {
    const response = await axios.get(`${baseURL}/domains/${domain}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error resolving domain:', error);
    throw error;
  }
};
