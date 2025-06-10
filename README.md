# 🔧 Backend - Application de Gestion de Bouteilles de Gaz

Ce backend permet de gérer la logistique des livraisons de bouteilles de gaz : création des livraisons, suivi du stock, calcul des revenus et du chiffre d'affaires des chauffeurs. Il est construit avec Node.js, Express.js et MongoDB.

---

## 🧱 Technologies utilisées

- **Node.js v22**
- **Express.js**
- **MongoDB** avec **Mongoose**
- **Dotenv** pour la configuration

---

## 📁 Structure du projet

```
gestion-gaz-backend/
│
├── models/              # Schémas de données
│   ├── Chauffeur.js
│   ├── Livraison.js
│   └── Stock.js
│
├── controllers/         # Logique métier
│   ├── chauffeur.controller.js
│   ├── livraison.controller.js
│   └── stock.controller.js
│
├── routes/              # Routes API REST
│   ├── chauffeur.routes.js
│   ├── livraison.routes.js
│   └── stock.routes.js
│
├── utils/
│   └── calculCA.js      # Calcul du chiffre d'affaires
│
├── app.js               # Initialisation Express
├── server.js            # Point d’entrée du serveur
├── .env                 # Variables d’environnement
└── package.json
```

---

## ⚙️ Installation et exécution

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d’environnement

Créer un fichier `.env` à la racine avec :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gestion_gaz
```

### 3. Lancer le serveur

```bash
nodemon app
```

---

## 🚚 Fonctionnement des livraisons

Une **livraison** contient :
- Type "sortie" ou "retour"
- L’ID du **chauffeur**
- L'ID du **camion**
- Une **date**
- Une **liste de bouteilles livrées**, avec pour chacune :
  - `statutSortie`: `"le nombre de bouteilles pleines"` ou `"le nombre de bouteilles vides"`
  - `statutRetour`: `"le nombre de bouteilles pleines"`, `"le nombre de bouteilles vides"`

- Pour la livraison de tyep "retour" il faut renseigner l'ID de la livraison sortie 


## 💸 Gestion des prix

| Type de vente           | Condition                                   | Prix unitaire |
|------------------------|---------------------------------------------|---------------|
| **Avec échange**       | Pleine livrée + vide retournée              | 4 950 FCFA    |
| **Sans échange**       | Pleine livrée, aucun retour                 | 25 000 FCFA   |

🔸 Les bouteilles **sorties pleines** sont les seules qui comptent dans le chiffre d’affaires.  
🔸 Les bouteilles sorties **vides** ne rapportent rien.

---

## 📡 Endpoints API

### Chauffeurs

- `POST /chauffeurs` – Ajouter un chauffeur
- `GET /chauffeurs` – Lister tous les chauffeurs
- `GET /chauffeurs/:id` – Obtenir les infos d’un chauffeur
- `GET /chauffeurs/:id/ca` – Chiffre d’affaires d’un chauffeur

### Livraisons

- `POST /livraisons` – Créer une livraison
- `GET /livraisons` – Voir toutes les livraisons

### Stock

- `GET /stock` – Suivi des bouteilles :pleines, vides

---

## 📊 Exemple de calcul du chiffre d'affaires

Si un chauffeur livre :

| statutSortie | statutRetour | Type         | Prix        |
|--------------|---------------|--------------|-------------|
| pleine       | vide          | avec échange | 4 950 FCFA  |
| pleine       | aucun         | sans échange | 25 000 FCFA |
| vide         | vide          | —            | 0 FCFA      |

### Résultat :

- CA total : **29 950 FCFA**
- 2 bouteilles pleines comptabilisées

---

## 🔒 Sécurité (prochaine étape)

- Authentification par JWT
- Rôles : Admin / Chauffeur

---
Changements importants :

Le calcul du chiffre d'affaires a été déplacé dans utils/calculCA.js pour clarifier la logique.

Une vérification a été ajoutée pour que les livraisons retour soient bien liées à une livraison sortie existante.

Le modèle de stock a été simplifié pour regrouper les informations dans un seul document.

Bugs rencontrés :

Le chiffre d’affaires prenait en compte les bouteilles vides. Des conditions ont été ajoutées pour les exclure.

Les livraisons retour étaient acceptées même sans référence à une livraison sortie. Une validation a été intégrée.

L’affichage du stock était incorrect. Une correction a été faite dans le contrôleur.

Choix techniques :

Utilisation de Mongoose pour les schémas de données stricts.

Découpage en modèle MVC pour faciliter la maintenance.

Centralisation des règles métier dans les contrôleurs.

## 🚀 Améliorations futures

- Tableau de bord statistique
- Génération de rapports PDF
- Gestion des retours anormaux
- Application mobile Flutter connectée

---

## 👨‍💻 Auteur

Développé par Groupe Bibang GI2A


---

## 📄 Licence

MIT – Projet libre d’utilisation et de modification.
