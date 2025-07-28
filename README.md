# SIRET Convention Collective Backend

API Express pour servir la convention collective d'une entreprise par SIRET à partir de fichiers JSON découpés.

## Usage

- Place tes fichiers dans `data/` à la racine.
- Lance le serveur :

```bash
npm install
npm start
```

- Endpoint :
  - `GET /api/convention?siret=38056968100048`

## Déploiement sur Render

- Crée un nouveau service Web sur Render relié à ce repo.
- Dossier de build : racine.
- Commande de démarrage : `npm start`
- Place tes fichiers JSON dans le dossier `data/` (voir la doc Render pour l’upload ou utilise un script d’import).

## Exemple de réponse

```json
{
  "MOIS": "2025-04",
  "SIRET": 38056968100048,
  "IDCC": 16,
  "DATE_MAJ": "2025/05/27"
}
```
