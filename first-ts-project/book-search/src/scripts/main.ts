import { searchBooks } from "../lib/requests";
import { appendResults } from "./AppendResults";
import { resultsContainer, displayResults } from "./MainContentComponent";

const searchField = document.getElementById('search-field') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;

let currentPage = 1;
let currentQuery = '';
let isLoading = false; // Flag to prevent multiple simultaneous requests

searchButton.addEventListener('click', async () => {
  const query = searchField.value.trim();
	
  if (!query) return;

  currentPage = 1;
  currentQuery = query;

  resultsContainer.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const results = await searchBooks(query, currentPage);
    displayResults(results);
  } catch (error) {
    resultsContainer.innerHTML = `<p class="error">${(error as Error).message}</p>`;
  }
});

// Default results on page load
if (resultsContainer.children.length === 0) {
	try {
    const results = await searchBooks('javascript', currentPage);
    displayResults(results);
  } catch (error) {
    resultsContainer.innerHTML = `<p class="error">${(error as Error).message}</p>`;
  }
}

// Create load more button if there are results
const loadMoreBtn = resultsContainer.children.length > 0 ? createLoadMoreButton() : null;

// Load more button functionality
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    
    if (!currentQuery || isLoading) return;

    isLoading = true;
    loadMoreBtn.disabled = true;

    try {
      currentPage++;

      const results = await searchBooks(currentQuery, currentPage);

      appendResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
      loadMoreBtn.disabled = false;
    }
  });
}

// Utility function to create Load More button
function createLoadMoreButton() {
  const button = document.createElement('button');
  button.id = 'load-more';
  button.textContent = 'Load more';
  document.body.appendChild(button);
  return button;
}