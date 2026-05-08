export interface Game {
    id: number;
    title: string;
    genre: string;
    releaseYear: number;
    price: number;
    platform: string[];
    cover?: string;
    inStock: boolean;
    rating?: number;
}

export interface GameFormPayload {
    title: string;
    genre: string;
    releaseYear: number;
    price: number;
    platform: string[];
    cover?: string;
    inStock?: boolean;
}

export interface PaginatedResult<T> {
	data: T[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}