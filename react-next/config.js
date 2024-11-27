const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR devrait utiliser l'URL Vercel
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''; // dev SSR devrait utiliser localhost
};

export const config = {
  baseUrl: getBaseUrl(),
};