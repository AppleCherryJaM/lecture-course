import type {Book, BookDetails} from "../types/types";
import {getAuthorDetails, getBookDetails, getImageUrl} from "../lib/requests";
import { getDescription } from "./utils";

const detailsContainer = getDetailsContainer();

export async function displayBookDetails(book: Book) {
  openModal();

	console.log(book.author_key);
  const author = await getAuthorDetails(book.author_key[0]);
  detailsContainer.innerHTML = `<div class="loading">Loading...</div>`;

  try {
    const details = await getBookDetails(book.cover_edition_key);
    const description = getDescription<BookDetails>(details); 
    detailsContainer.innerHTML = `
      <div class="book-detail">
        <button class="detail-close">×</button>

        <img src="${getImageUrl(details.cover_edition_key, 'L')}" class="book-detail-cover">

        <div class="book-detail-info">
          <h2>${details.title}</h2>

          <p class="author-link">
            <strong>Author:</strong>
            ${author.name} <span data-key="${author.key}" class="author-details-link">(View Details)</span>
          </p>

          <p><strong>Publish Date:</strong> ${details.publish_date || 'N/A'}</p>
          <p><strong>Publishers:</strong> ${details.publishers?.join(', ') || 'N/A'}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>
      </div>
    `;

    document.querySelector('.detail-close')!
      .addEventListener('click', closeModal);

    document.querySelectorAll('[data-key]').forEach(el => {
      el.addEventListener('click', () => {
        const key = ((el as HTMLElement).dataset.key!);
				const authorKey = key.split('/').pop()!;
        displayAuthorDetails(authorKey);
      });
    });

  } catch (e: any) {
    detailsContainer.innerHTML = `<p class="error">${e.message}</p>`;
  }
}

export async function displayAuthorDetails(authorKey: string) {
  detailsContainer.innerHTML = `<div class="loading">Loading...</div>`;

  try {
    const author = await getAuthorDetails(authorKey);

    detailsContainer.innerHTML = `
      <div class="author-detail">
				<button class="detail-close">×</button>
				<div class="author-detail-header">
					<img src="${getImageUrl(authorKey, 'L', "a")}" class="book-detail-cover">
        	<h2>${author.name}</h2>
      	</div>

				<div class="author-detail-info">
					<p><strong>Birth:</strong> ${author.birth_date || 'N/A'}</p>
					<p><strong>Death:</strong> ${author.death_date || 'N/A'}</p>

					<p>
						<strong>Bio:</strong>
						${
							typeof author.bio === 'string'
								? author.bio
								: author.bio?.value || 'N/A'
						}
					</p>
				</div>
      </div>
    `;

    document.querySelector('.detail-close')!
      .addEventListener('click', closeModal);

  } catch (e: any) {
    detailsContainer.innerHTML = `<p class="error">${e.message}</p>`;
  }
}

function openModal() {
	const container = getDetailsContainer();
  container.classList.add('active');

	// Close modal when clicking outside of the content
	container.addEventListener('click', (e) => {
    if (e.target === container) {
      closeModal();
    }
  });
}

// Close modal when clicking the close button or outside the content
function closeModal() {
  const container = getDetailsContainer();
  container.classList.remove('active');
}

// Ensure the details container exists in the DOM
function getDetailsContainer(): HTMLDivElement {
  let el = document.getElementById('book-details');

  if (!el) {
    el = document.createElement('div');
    el.id = 'book-details';
    document.body.appendChild(el);
  }

  return el as HTMLDivElement;
}