
import { API_BASE_URL, createAuthRequest } from './base';

/**
 * Service pour les départements
 */
export const departmentService = {
  /**
   * Récupérer tous les départements
   * @param token Token d'authentification
   * @returns Liste des départements
   */
  getAll: async (token: string) => {
    try {
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/departement/read`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération des départements");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  }
};
