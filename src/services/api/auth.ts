
import { API_BASE_URL } from './base';

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Connexion utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns Promise avec les données de connexion
   */
  login: async (email: string, password: string) => {
    try {
      // Création de l'objet de requête avec tous les paramètres nécessaires
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ 
          email,
          password 
        })
      };

      const response = await fetch(`${API_BASE_URL}/auth/login`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.detail || errorData?.message || "Identifiants invalides";
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },
};
