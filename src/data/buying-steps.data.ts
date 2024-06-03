import { Product, getProductsMounted } from "./products.data"

export enum BuyingStepType {
  PRODUCT = 'product',
  VIRTUAL = 'virtual'
}

export interface BuyingStep {
  id: number
  name: string
  type: BuyingStepType
  products?: BuyingStepProduct[]
}

export interface BuyingStepProduct {
  id: number
  name: string
  description?: string
  price: number | string
  stepId: number
}

export interface VirtualProduct {
  id: string
  name: string
  nameBkp?: string
  description?: string
  price: string
  priceBkp?: string
}

export const buyingSteps: BuyingStep[] = [
  { id: 1, name: 'Saches', type: BuyingStepType.PRODUCT },
  { id: 2, name: 'Açai', type: BuyingStepType.VIRTUAL },
  { id: 3, name: 'Talheres', type: BuyingStepType.VIRTUAL },
]

export const buyingStepsProducts: BuyingStepProduct[] = [
  { id: 1, name: 'Ketchup', description: 'Ketchup Hellmans', price: 0.5, stepId: 1 },
  { id: 2, name: 'Maionese', description: 'Maionese Hellmans', price: 0.5, stepId: 1 },
  { id: 3, name: '300ml', description: 'Copo Pequeno', price: 10.5, stepId: 2 },
  { id: 4, name: '500ml', description: 'Copo Médio', price: 12.5, stepId: 2 },
  { id: 5, name: '700ml', description: 'Copo Grande', price: 13.5, stepId: 2 },
  { id: 6, name: 'Garfo e Faca', description: '', price: 0, stepId: 3 }
]

export function getBuyingStepsMounted() {
  const products = buyingStepsProducts.reduce((prev: any, curr) => {
    if (!prev[curr.stepId]) prev[curr.stepId] = []

    prev[curr.stepId].push(curr)

    return prev
  }, {})

  return buyingSteps.map(el => {
    return { ...el, products: products[el.id] }
  }, {})
}