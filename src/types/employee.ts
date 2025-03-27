
export interface Department {
  id: number;
  nom: string;
  description: string;
}

export interface Employee {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  date_naissance: string;
  nationalite: string;
  genre: string;
  date_embauche: string;
  departement_id: number;
  nom_departement: string;
  poste_id: number;
  titre_poste: string;
  manager_id: number;
  nom_manager: string;
  lieu_travail: string;
  type_contrat: string;
  statut: string;
  numero_securite_sociale: string;
  informations_bancaires: string;
  contact_urgence: string;
  notes: string;
}

export interface EmployeeUpdate {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  nationalite: string;
  genre: string;
  departement_id: number;
  poste_id: number;
  manager_id: number;
  lieu_travail: string;
  type_contrat: string;
  statut: string;
  numero_securite_sociale: string;
  informations_bancaires: string;
  contact_urgence: string;
  notes: string;
}
