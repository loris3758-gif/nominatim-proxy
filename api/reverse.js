export default async function handler(req, res) {

  // 1) Imposta CORS per tutte le risposte
  res.setHeader("Access-Control-Allow-Origin", "https://www.vepar.it");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2) Rispondi subito alle richieste preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // no body
  }

  // 3) Solo GET è ammesso
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
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

  return res.status(200).json(data);
}
