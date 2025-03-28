
import { Employee } from "@/types/employee";

export const prepareEmployeeUpdateData = (formData: any) => {
  return {
    prenom: formData.prenom,
    nom: formData.nom,
    email: formData.email,
    telephone: formData.telephone || "",
    adresse: formData.adresse || "",
    nationalite: formData.nationalite || "",
    genre: formData.genre || "",
    departement_id: Number(formData.departement_id) || 0,
    poste_id: Number(formData.poste_id || 0),
    manager_id: Number(formData.manager_id || 0),
    lieu_travail: formData.lieu_travail || "",
    type_contrat: formData.type_contrat || "",
    statut: formData.statut || "Actif",
    numero_securite_sociale: formData.numero_securite_sociale || "",
    informations_bancaires: formData.informations_bancaires || "",
    contact_urgence: formData.contact_urgence || "",
    notes: formData.notes || "",
  };
};
