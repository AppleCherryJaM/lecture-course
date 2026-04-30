import { getImageUrl } from "../lib/requests";
import { displayBookDetails } from "./DetailComponent";
import type { Book } from "../types/types";

export const resultsContainer = document.getElementById('book-list') as HTMLDivElement;

export const displayResults = (books: Book[]) => {
	if (books.length === 0) {
		resultsContainer.innerHTML = '<p>No results found.</p>';
		return;
	}
	resultsContainer.innerHTML = books.map(book => `
		<div class="book-item">
			<img src="${getImageUrl(book.cover_edition_key)}" alt="${book.title} cover" class="book-cover">
			<div class="book-info">
				<h3>${book.title}</h3>
				<p>${book.author_name}</p>
			</div>
		</div>
	`).join('');
	
	const bookItems = resultsContainer.querySelectorAll('.book-item');
	bookItems.forEach((item, index) => {
		item.addEventListener('click', () => displayBookDetails(books[index]));
	});
}