import { API_BASE_URL, createAuthRequest } from './base';

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
      console.error("Erreur lors de la récupération des employés:", error);
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
      console.log(`Fetching employee with ID: ${id}`);
      const requestOptions = createAuthRequest(token);
      const response = await fetch(`${API_BASE_URL}/employer/get/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la récupération de l'employé");
      }

      const data = await response.json();
      console.log("Employee data received from API:", data);
      
      // Vérifier que les données sont valides
      if (!data || !data.id) {
        throw new Error("Données d'employé invalides reçues de l'API");
      }
      
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'employé ${id}:`, error);
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
      console.log(`Updating employee with ID: ${id}`, employeeData);
      
      // Create a clean payload without undefined values
      const cleanPayload = Object.fromEntries(
        Object.entries(employeeData).map(([key, value]) => {
          // Explicitly handle null values to make sure they're sent as null and not converted to empty strings
          return [key, value === null ? null : value];
        })
      );
      
      console.log("Clean payload for update:", cleanPayload);
      
      const requestOptions = createAuthRequest(token, "PUT", cleanPayload);
      const response = await fetch(`${API_BASE_URL}/employer/update/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(errorData?.message || "Erreur lors de la mise à jour de l'employé");
      }

      const data = await response.json();
      console.log("Update response:", data);
      return data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'employé ${id}:`, error);
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
      console.log(`Deleting employee with ID: ${id}`);
      const requestOptions = createAuthRequest(token, "DELETE");
      const response = await fetch(`${API_BASE_URL}/employer/delete/${id}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erreur lors de la suppression de l'employé");
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'employé ${id}:`, error);
      throw error;
    }
  }
};
