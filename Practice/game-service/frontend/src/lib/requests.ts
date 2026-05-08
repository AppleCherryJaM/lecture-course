import type { Game, PaginatedResult } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL

export async function fetchGames(): Promise<PaginatedResult<Game>> {
    const response = await fetch(`${API_URL}/games`)
    
    if (!response.ok) {
        throw new Error('Failed to fetch games')
    }
    
    return response.json()
}

export async function fetchGameById(id: number): Promise<Game> {
    const response = await fetch(`${API_URL}/games/${id}`)
    
    if (!response.ok) {
        throw new Error('Failed to fetch game')
    }

    return response.json()
}

export async function createGame(gameData: { title: string; genre: string; platform: string[] }): Promise<Game> {
    const response = await fetch(`${API_URL}/games/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
    })

    if (!response.ok) {
        throw new Error('Failed to create game')
    }

    return response.json()
}

export async function updateGame(id: number, gameData: { title?: string; genre?: string; platform?: string[] }): Promise<Game> {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
    });

    if (!response.ok) {
        throw new Error('Failed to update game')
    }

    return response.json()
}

export async function deleteGame(id: number) {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete game')
    }

    return response.json()
}

export async function searchGames(query: string): Promise<PaginatedResult<Game>> {
    const response = await fetch(`${API_URL}/games/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error('Failed to search games')
    }

    return response.json();
}

export async function filterGamesByGenre(genre: string): Promise<PaginatedResult<Game>> {
    const response = await fetch(`${API_URL}/games/genre/${encodeURIComponent(genre)}`);
    
    if (!response.ok) {
        throw new Error('Fai    led to filter games by genre')
    }

    return response.json();
}