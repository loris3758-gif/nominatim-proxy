export default async function handler(req, res) { 
  // Imposta header CORS generali
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gestisci preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Parametri mancanti" });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=it`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "vepar.it PWA"
    }
  });

  const data = await response.json();

  res.status(200).json(data);
}

