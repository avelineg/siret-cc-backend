const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// À adapter au nom réel de tes fichiers
const SIRET_FILES = [
  'json_1_siret_9999.json',
  'json_2_siret_9999.json',
  'json_3_siret_9999.json',
  'json_4_siret_9999.json',
];

// Active CORS pour le frontend
app.use(cors());

app.get('/api/convention', async (req, res) => {
  const { siret } = req.query;
  if (!siret) {
    return res.status(400).json({ error: 'Paramètre siret obligatoire' });
  }
  const siretKey = String(siret).padStart(14, '0');
  for (const file of SIRET_FILES) {
    const fullPath = path.join(__dirname, 'data', file);
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      const arr = JSON.parse(content);
      const found = arr.find(obj => String(obj.SIRET).padStart(14, '0') === siretKey);
      if (found) {
        return res.json(found);
      }
    } catch (e) {
      // Ignore le fichier si absent ou corrompu
      console.error(`Erreur lecture fichier ${file}:`, e.message);
      continue;
    }
  }
  return res.status(404).json({ error: 'Aucune convention trouvée pour ce SIRET' });
});

// Pour Render healthcheck
app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log('API SIRET-CC démarrée sur port', PORT);
});
