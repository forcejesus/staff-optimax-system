
/**
 * Base API service with common utilities
 */

export const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Fonction utilitaire pour créer des requêtes avec authentification
 */
export const createAuthRequest = (token: string, method: string = "GET", body?: any) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": `Bearer ${token}`
  };

  const requestOptions: RequestInit = {
    method,
    headers
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  return requestOptions;
};
