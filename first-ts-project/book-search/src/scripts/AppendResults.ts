import { getImageUrl } from "../lib/requests";
import type { Book } from "../types/types";
import { resultsContainer } from "./MainContentComponent";

export const appendResults = (books: Book[]) => {
  const html = books.map(book => `
    <div class="book-item">
      <img src="${getImageUrl(book.cover_i)}" class="book-cover">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>${book.author_name?.join(', ') || 'Unknown'}</p>
      </div>
    </div>
  `).join('');

  resultsContainer.insertAdjacentHTML('beforeend', html);
};