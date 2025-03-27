
/**
 * Services API centralisés pour l'application
 */

const API_BASE_URL = "https://sgd-it.net/api";

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
          // Ajout d'en-têtes pour éviter les problèmes CORS
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({ 
          username: email, 
          password 
        })
      };

      const response = await fetch(`${API_BASE_URL}/auth/login`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Identifiants invalides");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },
};

/**
 * Service pour les employés
 */
export const employeeService = {
  // Futures méthodes pour la gestion des employés
};

/**
 * Service pour les congés
 */
export const leaveService = {
  // Futures méthodes pour la gestion des congés
};

/**
 * Service pour les présences
 */
export const attendanceService = {
  // Futures méthodes pour la gestion des présences
};
