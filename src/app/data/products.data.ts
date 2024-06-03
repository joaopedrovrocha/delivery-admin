import { BuyingStep, buyingSteps, getBuyingStepsMounted } from "./buying-steps.data"
import { Category, categories } from "./categories.data"

export interface Product {
  id: number
  name: string
  description: string
  price: number | string
  categoryId: number
  category?: Category
  imageUrl: string
  buyingSteps?: ProductBuyingStep[]
}

export interface ProductBuyingStep {
  id: number
  productId: number
  product?: Product
  buyingStepId: number
  buyingStep?: BuyingStep
  order: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Big Mac',
    description: 'Dois hambúrgueres (100% carne bovina), alface americana, queijo cheddar, maionese Big Mac, cebola, picles e pão com gergelim',
    price: 28.9,
    categoryId: 1,
    imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/efc182a9-79f5-4f8c-a437-b9ccc4d4ea23/202405071021_qxtivyhltk.png',
  },
  {
    id: 2,
    name: 'Quarteirão com Queijo',
    description: 'Um hambúrguer (100% carne bovina), queijo cheddar, picles, cebola, ketchup, mostarda e pão com gergelim',
    price: 28.9,
    categoryId: 1,
    imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/efc182a9-79f5-4f8c-a437-b9ccc4d4ea23/202405071021_6teo63jwga5.png',
  },
  {
    id: 3,
    name: 'McChicken Bacon',
    description: 'Frango empanado, maionese, bacon, alface americana e pão com gergelim',
    price: 25.0,
    categoryId: 1,
    imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/efc182a9-79f5-4f8c-a437-b9ccc4d4ea23/202405071021_ybf1r2sb1fs.png',
  },
  {
    id: 4,
    name: 'Ketchup',
    description: 'bla bla bla',
    price: 1.5,
    categoryId: 5,
    imageUrl: 'https://images-food.ifcshop.com.br/produto/46409_0_20220425121804.jpg',
  },
  {
    id: 5,
    name: 'Maionese',
    description: 'bla bla bla',
    price: 1.4,
    categoryId: 5,
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/602464/maionese_heinz_sache_7g_caixa_176_unidades_78_1_6b16e1422e5a390738caaee7364a3d29.jpg',
  },
  {
    id: 6,
    name: 'Açaí',
    description: 'bla bla bla',
    price: 0,
    categoryId: 3,
    imageUrl: 'https://phygital-files.mercafacil.com/vergara/uploads/produto/copo_acai_gourmet_400ml_350g_10340747-7175-45c6-a7ef-b77365b73289.jpg',
  },
  {
    id: 7,
    name: 'Coca-Cola',
    description: 'Delícia',
    price: 10.0,
    categoryId: 3,
    imageUrl: 'https://andinacocacola.vtexassets.com/arquivos/ids/157658/110441_COCA---CCO2.5L.jpg?v=638404086226530000',
  },
]

export const productBuyingStep: ProductBuyingStep[] = [
  { id: 1, productId: 1, buyingStepId: 1, order: 1 },
  { id: 2, productId: 1, buyingStepId: 2, order: 2 },
  { id: 3, productId: 1, buyingStepId: 3, order: 3 },
]

export function getProductsMounted(): Product[] {
  return products.reduce((prev: any, curr) => {
    return [
      ...prev,
      {
        ...curr,
        category: categories.find(el => el.id === curr.categoryId),
        buyingSteps: productBuyingStep
          .filter(pbs => pbs.productId === curr.id)
          .map(pbs => ({ ...pbs, buyingStep: buyingSteps.find(bs => bs.id === pbs.buyingStepId) }))
      }]
  }, [])
}

export function getProductsByCategory(categoryId: number) {
  return getProductsMounted().filter(el => el.categoryId === categoryId)
}