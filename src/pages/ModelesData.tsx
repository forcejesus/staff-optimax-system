
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ModelesData = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modèles de données</h1>
        <p className="text-muted-foreground">
          Structure des modèles de données pour la gestion des employés
        </p>
      </div>

      <Tabs defaultValue="employe" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="employe">Employé</TabsTrigger>
          <TabsTrigger value="conges">Congés</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="avancements">Avancements</TabsTrigger>
          <TabsTrigger value="retraite">Retraite</TabsTrigger>
        </TabsList>

        <TabsContent value="employe">
          <Card>
            <CardHeader>
              <CardTitle>Modèle Employé</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto">
{`from django.db import models
from django.contrib.auth.models import User

class Departement(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.nom

class Poste(models.Model):
    titre = models.CharField(max_length=100)
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE, related_name='postes')
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.titre

class Employe(models.Model):
    CHOIX_GENRE = [
        ('homme', 'Homme'),
        ('femme', 'Femme'),
        ('non_binaire', 'Non-binaire'),
        ('autre', 'Autre'),
    ]
    
    CHOIX_STATUT = [
        ('actif', 'Actif'),
        ('en_conge', 'En congé'),
        ('suspendu', 'Suspendu'),
        ('retraite', 'Retraité'),
        ('fin_contrat', 'Fin de contrat'),
    ]
    
    utilisateur = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20)
    adresse = models.TextField()
    date_naissance = models.DateField()
    nationalite = models.CharField(max_length=50)
    genre = models.CharField(max_length=20, choices=CHOIX_GENRE)
    date_embauche = models.DateField()
    departement = models.ForeignKey(Departement, on_delete=models.SET_NULL, null=True, related_name='employes')
    poste = models.CharField(max_length=100)
    responsable = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordonnes')
    lieu_travail = models.CharField(max_length=100)
    type_contrat = models.CharField(max_length=50)
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='actif')
    numero_securite_sociale = models.CharField(max_length=50, blank=True, null=True)
    coordonnees_bancaires = models.CharField(max_length=100, blank=True, null=True)
    contact_urgence = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Presence(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='presences')
    date = models.DateField()
    heure_arrivee = models.TimeField(null=True, blank=True)
    heure_depart = models.TimeField(null=True, blank=True)
    statut = models.CharField(max_length=20, default='present')  # present, absent, retard, demi_journee
    note = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = ('employe', 'date')
    
    def __str__(self):
        return f"{self.employe} - {self.date}"
`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conges">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de Congés et Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto">
{`class TypeConge(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    paye = models.BooleanField(default=True)
    jours_max_par_an = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.nom

class DemandeConge(models.Model):
    CHOIX_STATUT = [
        ('en_attente', 'En attente'),
        ('approuve', 'Approuvé'),
        ('rejete', 'Rejeté'),
        ('annule', 'Annulé'),
    ]
    
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='demandes_conge')
    type_conge = models.ForeignKey(TypeConge, on_delete=models.CASCADE)
    date_debut = models.DateField()
    date_fin = models.DateField()
    motif = models.TextField()
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='en_attente')
    approuve_par = models.ForeignKey(Employe, on_delete=models.SET_NULL, null=True, blank=True, related_name='conges_approuves')
    date_approbation = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.employe} - {self.date_debut} à {self.date_fin}"

class DemandePermission(models.Model):
    CHOIX_STATUT = [
        ('en_attente', 'En attente'),
        ('approuve', 'Approuvé'),
        ('rejete', 'Rejeté'),
    ]
    
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='demandes_permission')
    date = models.DateField()
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    motif = models.TextField()
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='en_attente')
    approuve_par = models.ForeignKey(Employe, on_delete=models.SET_NULL, null=True, blank=True, related_name='permissions_approuvees')
    
    def __str__(self):
        return f"{self.employe} - {self.date}"
`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto">
{`class TypeDocument(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.nom

class Document(models.Model):
    CHOIX_STATUT = [
        ('en_attente', 'En attente'),
        ('approuve', 'Approuvé'),
        ('rejete', 'Rejeté'),
        ('traite', 'Traité'),
        ('signe', 'Signé'),
        ('genere', 'Généré'),
    ]
    
    nom = models.CharField(max_length=200)
    type = models.ForeignKey(TypeDocument, on_delete=models.CASCADE, related_name='documents')
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='documents')
    fichier = models.FileField(upload_to='documents_employe/')
    date_telechargement = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='en_attente')
    
    def __str__(self):
        return self.nom
`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avancements">
          <Card>
            <CardHeader>
              <CardTitle>Modèles d'Avancement</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto">
{`class TypeAvancement(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.nom

class Avancement(models.Model):
    CHOIX_STATUT = [
        ('en_attente', 'En attente'),
        ('en_validation', 'En cours de validation'),
        ('approuve', 'Approuvé'),
        ('rejete', 'Rejeté'),
    ]
    
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='avancements')
    ancien_poste = models.CharField(max_length=100)
    nouveau_poste = models.CharField(max_length=100)
    type = models.ForeignKey(TypeAvancement, on_delete=models.CASCADE)
    date_demande = models.DateField(auto_now_add=True)
    date_effective = models.DateField()
    motif = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='en_attente')
    approuve_par = models.ForeignKey(Employe, on_delete=models.SET_NULL, null=True, blank=True, related_name='avancements_approuves')
    
    def __str__(self):
        return f"{self.employe} - {self.nouveau_poste}"
`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retraite">
          <Card>
            <CardHeader>
              <CardTitle>Modèle de Planification de Retraite</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-auto">
{`class PlanificationRetraite(models.Model):
    CHOIX_STATUT = [
        ('a_venir', 'À venir'),
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
    ]
    
    employe = models.OneToOneField(Employe, on_delete=models.CASCADE, related_name='plan_retraite')
    date_prevue = models.DateField()
    statut = models.CharField(max_length=20, choices=CHOIX_STATUT, default='a_venir')
    notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Retraite de {self.employe} - {self.date_prevue}"
`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelesData;
