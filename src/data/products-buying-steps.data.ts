import { BuyingStep, getBuyingStepsMounted } from "./buying-steps.data"
import { Product, getProductsMounted } from "./products.data"

export interface ProductsBuyingSteps {
  buyingStepId: number
  productId: number
  product?: Product
  buyingStep?: BuyingStep
}

export const productsBuyingSteps: ProductsBuyingSteps[] = [
  { buyingStepId: 1, productId: 1 },
  { buyingStepId: 1, productId: 2 },
  { buyingStepId: 1, productId: 3 },
]

export function getProductsBuyingStepsMounted() {
  return productsBuyingSteps.map(pbs => ({
    ...pbs,
    product: getProductsMounted().find(el => el.id === pbs.productId),
    buyingStep: getBuyingStepsMounted().find(el => el.id === pbs.buyingStepId)
  }))
}

export function getProductsBuyingStepsByBuyingStepId(bsId: number) {
  return getProductsBuyingStepsMounted().filter(el => el.buyingStepId === bsId)
}