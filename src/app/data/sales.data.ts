import { Product, getProductsMounted } from "./products.data"

export interface Sale {
  id: number
  name: string
  products?: SaleProduct[]
  startsAt: string
  endsAt: string
}

export interface SaleProduct {
  id: number
  saleId: number
  sale?: Sale
  productId: number
  product?: Product
  price: number | string
}

export const sales: Sale[] = [
  { id: 1, name: 'Promoção McOfertas', startsAt: '2024-05-28', endsAt: '2025-06-28' }
]

export const saleProducts: SaleProduct[] = [
  { id: 1, saleId: 1, price: 10, productId: 1 },
  { id: 2, saleId: 1, price: 10, productId: 2 },
  { id: 3, saleId: 1, price: 10, productId: 3 },
]

export function getSalesMounted() {
  const prods = getProductsMounted()

  const products = saleProducts.reduce((prev: { [id: string]: SaleProduct[] }, curr: SaleProduct) => {
    if (!prev[curr.saleId]) {
      prev[curr.saleId] = []
    }

    prev[curr.saleId].push({ ...curr, product: prods.find(el => el.id === curr.productId) })

    return prev
  }, {}) as unknown as { [id: string]: SaleProduct[] }

  return sales.map(el => ({
    ...el,
    products: products[el.id]
  }))
}