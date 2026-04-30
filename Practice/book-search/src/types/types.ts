export interface Book {
	title: string;
	author_name: string[];
	cover_i: number;
	author_key: string;
	cover_edition_key: string;
}

export interface SearchResponse {
	numFound: number;
	start: number;
	docs: Book[];
}

export interface BookDetails {
	title: string;
	authors: { key: string; }[];
	publish_date: string;
	publishers: string[];
	cover_id: number;
	subjects: string[];
	cover_edition_key: string;
	description: string | { value: string };
}

export interface AuthorDetails {
	name: string;
	birth_date: string;
	death_date: string;
	bio: string | { value: string };
	key: string;
}

export class RequestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RequestError';
	}

	public static fromResponse(response: Response): RequestError {
		return new RequestError(`Error ${response.status}: ${response.statusText}`);
	}
}