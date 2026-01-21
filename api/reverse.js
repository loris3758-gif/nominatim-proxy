export default async function handler(req, res) {
  // Imposta header CORS PRIMA di inviare la risposta
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Parametri mancanti" });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=it`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "vepar.it PWA"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Errore da Nominatim" });
    }

    const data = await response.json();

    // Risposta con header già settati sopra
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Errore server interno" });
  }
}
