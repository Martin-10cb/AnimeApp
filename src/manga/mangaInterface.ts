export interface Manga {
    id: string;
    cover: string;
    description?: string; 
}

export interface MangaDetails extends Manga {
    title?: string;
    altTitle: string;        
    tags: string[];           
    authors: string[];
    chaptersCount: number;   
    lastChapters: Chapter[];  
}

export interface Chapter {
    id: string;
    chapterNumber: string;    
}