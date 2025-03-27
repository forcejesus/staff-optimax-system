
/**
 * Services API centralisés pour l'application
 */

// const API_BASE_URL = "https://www.sgd-it.net/api";
const API_BASE_URL = "http://127.0.0.1:8000/api";

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

/**
 * Fonction utilitaire pour créer des requêtes avec authentification
 */
const createAuthRequest = (token: string, method: string = "GET", body?: any) => {
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

/**
 * Service pour les employés
 */
export const employeeService = {
  /**
   * Récupérer tous les employés
   * @param token Token d'authentification
   * @returns Liste des employés
   */
  getAll: async (token: string) => {
    try {
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/employer/read`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération des employés");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  },

  /**
   * Récupérer un employé par son ID
   * @param token Token d'authentification
   * @param id ID de l'employé
   * @returns Détails de l'employé
   */
  getById: async (token: string, id: number) => {
    try {
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/employer/get/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération de l'employé");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour un employé
   * @param token Token d'authentification
   * @param id ID de l'employé
   * @param employeeData Données de l'employé à mettre à jour
   * @returns Employé mis à jour
   */
  update: async (token: string, id: number, employeeData: any) => {
    try {
      const requestOptions = createAuthRequest(token, "PUT", employeeData);
      const response = await fetch(`${API_BASE_URL}/employer/update/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la mise à jour de l'employé");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  },

  /**
   * Supprimer un employé
   * @param token Token d'authentification
   * @param id ID de l'employé
   * @returns Message de confirmation
   */
  delete: async (token: string, id: number) => {
    try {
      const requestOptions = createAuthRequest(token, "DELETE");
      const response = await fetch(`${API_BASE_URL}/employer/delete/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la suppression de l'employé");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  }
};

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
