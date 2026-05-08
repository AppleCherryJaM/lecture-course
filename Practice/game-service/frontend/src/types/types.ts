export interface Game {
    id: number;
    title: string;
    genre: string;
    releaseYear: string;
    price: number;
    platform: string[];
    cover?: string;
    inStock: boolean;
    rating?: number;
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