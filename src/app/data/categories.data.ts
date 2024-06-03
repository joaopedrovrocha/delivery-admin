export interface Category {
  id: number
  name: string
}

export const categories: Category[] = [
  { id: 1, name: 'McOfertas' },
  { id: 2, name: 'Sanduiches' },
  { id: 3, name: 'Bebidas' },
  { id: 4, name: 'Adicionais' },
  { id: 5, name: 'Sachês' },
]

export function getCategories() {
  return categories
}