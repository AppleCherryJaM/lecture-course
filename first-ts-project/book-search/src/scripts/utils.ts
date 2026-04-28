export function getDescription<T extends { description?: string | { value: string } }>(book: T): string {
  const description = book.description;

  if (!description) return 'Информация недоступна';

  if (typeof description === 'string') {
    return description;
  }

  if (typeof description === 'object' && description.value) {
    return description.value;
  }

  return 'Информация недоступна';
}