import type { AuthorDetails, Book, BookDetails, SearchResponse } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

export async function searchBooks(query: string, page: number = 1): Promise<Book[]> {
	const limit = 20;
	const offset = (page - 1) * limit;
	const response = await fetch(`${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`);
	
	if (!response.ok) {
		throw new Error(`Error fetching books: ${response.statusText}`);
	}

	const searchResult: SearchResponse = (await response.json()) as SearchResponse;
	const result = searchResult.docs;
	return result;
}

export async function getBookDetails(editionKey: string): Promise<BookDetails>{
	const response = await fetch(`${API_BASE_URL}/books/${editionKey}.json`);
	
	if (!response.ok) {
		throw new Error(`Error fetching book details: ${response.statusText}`);
	}
	
	const result: BookDetails = await response.json();
	return result;
}

export async function getAuthorDetails(authorKey: string): Promise<AuthorDetails> {
	const response = await fetch(`${API_BASE_URL}/authors/${authorKey}.json`);
	
	if (!response.ok) {
		throw new Error(`Error fetching author details: ${response.statusText}`);
	}
	
	const result: AuthorDetails = await response.json();
	return result;
}

export function getImageUrl(key: number | string, size: 'S' | 'M' | 'L' = 'M', type: 'b' | 'a' = 'b') {
	const result = `${API_IMAGE_URL}/${type}/olid/${key}-${size}.jpg`;
	return result;
}