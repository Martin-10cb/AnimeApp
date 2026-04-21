// services/mangaService.ts

import { GENRE_MAP } from '../constants/mangaDexTags';
import { Manga } from './mangaInterface';

const BASE_URL = 'https://api.mangadex.org';

export const mangaService = {
  
  getTopPopular: async (): Promise<Manga[]> => {
    // Mantenemos el filtro es-la para asegurar contenido en latino
    const url = `${BASE_URL}/manga?limit=5&order[followedCount]=desc&availableTranslatedLanguage[]=es-la&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`;
    return fetchAndMapMangas(url);
  },

  getMangasByGenre: async (genreName: string): Promise<Manga[]> => {
    const cleanName = genreName.toLowerCase().trim();
    const genreId = GENRE_MAP[cleanName];

    // 1. Intentamos primero por ID (Es lo más preciso para evitar mezclar géneros)
    if (genreId) {
      const urlById = `${BASE_URL}/manga?includedTags[]=${genreId}&availableTranslatedLanguage[]=es-la&order[followedCount]=desc&limit=15&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`;
      const results = await fetchAndMapMangas(urlById);
      
      if (results.length > 0) return results;
    }

    // 2. FALLBACK: Si por ID no vino nada, buscamos por término de texto
    // Esto suele "desbloquear" los resultados que el API oculta por tags
    console.log(`[Fallback] Buscando por texto para: ${cleanName}`);
    
    // Mapeo simple para traducir términos si es necesario para el buscador
    const searchTerms: Record<string, string> = {
      "accion": "action",
      "ciencia ficcion": "sci-fi",
      "psicologico": "psychological",
      "recuentos de la vida": "slice of life",
    };

    const term = searchTerms[cleanName] || cleanName;
    const urlByText = `${BASE_URL}/manga?title=${term}&availableTranslatedLanguage[]=es-la&order[followedCount]=desc&limit=15&includes[]=cover_art&contentRating[]=safe`;
    
    return fetchAndMapMangas(urlByText);
  }
};


const fetchAndMapMangas = async (url: string): Promise<Manga[]> => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (!json.data) return [];

    return json.data.map((item: any) => {
      const fileName = item.relationships.find((r: any) => r.type === 'cover_art')?.attributes?.fileName;
      
      const desc = item.attributes.description;
      const synopsis = desc['es-la'] || desc.es || desc.en || '';

      return {
        id: item.id,
        title: item.attributes.title.en || item.attributes.title.ja || item.attributes.title['es-la'] || 'Sin título',
        description: synopsis.replace(/\[.*?\]/g, ''), // Limpiamos códigos de MangaDex
        cover: `https://uploads.mangadex.org/covers/${item.id}/${fileName}`,
      };
    });
  } catch (error) {
    console.error("Error en fetchAndMapMangas:", error);
    return [];
  }
};