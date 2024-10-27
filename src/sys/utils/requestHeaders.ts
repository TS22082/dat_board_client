import { RequestTypes } from '../types.ts';

const requestHeaders = (reqType: RequestTypes) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return null;
  return {
    method: reqType,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  };
};

export default requestHeaders;
