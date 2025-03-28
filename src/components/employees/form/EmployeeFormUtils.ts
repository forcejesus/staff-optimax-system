
import { Employee } from "@/types/employee";

export const prepareEmployeeUpdateData = (formData: any) => {
  // Convert empty strings to null for ID fields
  const departementId = formData.departement_id === "" ? null : 
    formData.departement_id ? Number(formData.departement_id) : null;
  
  const posteId = formData.poste_id === "" ? null :
    formData.poste_id ? Number(formData.poste_id) : null;
  
  const managerId = formData.manager_id === "" ? null :
    formData.manager_id ? Number(formData.manager_id) : null;

  return {
    prenom: formData.prenom || "",
    nom: formData.nom || "",
    email: formData.email || "",
    telephone: formData.telephone || "",
    adresse: formData.adresse || "",
    nationalite: formData.nationalite || "",
    genre: formData.genre || "",
    departement_id: departementId,
    poste_id: posteId,
    manager_id: managerId,
    lieu_travail: formData.lieu_travail || "",
    type_contrat: formData.type_contrat || "",
    statut: formData.statut || "Actif",
    numero_securite_sociale: formData.numero_securite_sociale || "",
    informations_bancaires: formData.informations_bancaires || "",
    contact_urgence: formData.contact_urgence || "",
    notes: formData.notes || "",
  };
};
