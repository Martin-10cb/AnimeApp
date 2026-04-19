export const GENRE_MAP: Record<string, string> = {
  "accion": "391b0423-db20-4562-911e-0a0a64feb47e",
 "romance": "423e21fe-06b5-4c0d-9fd2-47d802e59f2c",
  "harem": "aafb99c1-7fde-44e4-86f6-f11100439c2c",
  "comedia": "4d32b451-11ed-4a30-a828-858129ee1146",
  "drama": "b9af3a63-f058-46de-a9a0-e0c13906197a",
  "aventura": "87cc87cd-a395-47af-b27a-93258283bbc6",
  "fantasia": "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
  "misterio": "ee968100-4191-4968-93d3-f82d72be7e46",
  "terror": "cdad7e68-1419-41dd-a110-99070762bb2b",
  "recuentos de la vida": "e5301a23-ebd9-49dd-a0cb-2bc94457e190",
  "ciencia ficcion": "256c8bd9-4904-4360-bf4f-508a76d67183",
  "sobrenatural": "eabc5b4c-6aff-42f3-b657-3e90cbd00b75",
  "psicologico": "3b60b75c-a2d7-4860-8c15-212e039f3f9b",
  "deportes": "69960e6f-a40e-497f-90b9-6ec598146220",
  "tragedia": "f8f54142-96a4-493a-9ccb-9c0a33f0d231",
  "isekai": "ace0432b-1650-481e-b91a-8611fe70ee79",
  "escolar": "caaa44aa-483e-4727-9b57-e6447a0b1271",
  "historico": "33771934-028e-4cb3-8744-691e866a923e",
  "supervivencia": "5fff9cde-849c-4d78-aab0-0d52b2ee1d25",
  "reencarnacion": "0bc1be07-41d5-4886-ad72-2059e3a9910a",
  "magia": "a1f53773-c69a-4ce5-8cab-fffcd90b1565",
  "artes marciales": "7b395624-9174-48cd-86bc-6240dd063f69",
  "gore": "b29d0366-319c-4a2c-8728-641e97666497",
  "crimen": "5ca05a35-21d4-47fd-b5bc-79f9479e0007",
  "demonios": "3955294e-7aee-4c6b-966a-211f71a070f0",
  "cocina": "ea061599-6515-4923-a8c6-302341b5894f",
  "videojuegos": "9438db5a-7e2a-4ac0-b39e-e0d95a34b8a8"
};

// Function to convert genre names to their corresponding IDs using the GENRE_MAP
export const convertGenresToIds = (genres: string[]): string[] => {
  return genres
    .map(g => GENRE_MAP[g.toLowerCase().trim()])
    .filter(id => id !== undefined);
};