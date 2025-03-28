
import { API_BASE_URL, createAuthRequest } from './base';

/**
 * Service pour les postes
 */
export const positionService = {
  /**
   * Récupérer tous les postes
   * @param token Token d'authentification
   * @returns Liste des postes
   */
  getAll: async (token: string) => {
    try {
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/poste/read`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération des postes");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  },

  /**
   * Récupérer un poste par son ID
   * @param token Token d'authentification
   * @param id ID du poste
   * @returns Détails du poste
   */
  getById: async (token: string, id: number) => {
    try {
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/poste/get/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération du poste");
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération du poste ${id}:`, error);
      throw error;
    }
  }
};
