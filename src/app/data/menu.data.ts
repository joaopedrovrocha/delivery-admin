import { Product, products } from "./products.data"
import { getSalesMounted } from "./sales.data"

export enum WEEKDAY {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export interface Menu {
  id: number
  name: string
  timeTable?: MenuTimeTable[]
  products?: MenuSectionProducts[]
  sections?: MenuSection[]
}

export interface MenuSection {
  id: number
  name: string
  menuId: number
  menu?: Menu
  products?: MenuSectionProducts[]
}

export interface MenuTimeTable {
  id: number
  menuId: number
  weekday: WEEKDAY
  active: boolean
  startTime?: string
  endTime?: string
}

export interface MenuSectionProducts {
  id: number
  sectionId: number
  section?: MenuSection
  productId: number
  product?: Product
  price: number | string
  priceDetail: string
}

export const menus: Menu[] = [
  { id: 1, name: 'Cardápio Semanal' }
]

export const menuTimeTable: MenuTimeTable[] = [
  { id: 1, menuId: 1, weekday: WEEKDAY.SUNDAY, active: false },
  { id: 2, menuId: 1, weekday: WEEKDAY.MONDAY, active: true, startTime: '09:00', endTime: '22:00' },
  { id: 3, menuId: 1, weekday: WEEKDAY.TUESDAY, active: true, startTime: '09:00', endTime: '22:00' },
  { id: 4, menuId: 1, weekday: WEEKDAY.WEDNESDAY, active: true, startTime: '09:00', endTime: '22:00' },
  { id: 5, menuId: 1, weekday: WEEKDAY.THURSDAY, active: true, startTime: '09:00', endTime: '22:00' },
  { id: 6, menuId: 1, weekday: WEEKDAY.FRIDAY, active: true, startTime: '09:00', endTime: '22:00' },
  { id: 7, menuId: 1, weekday: WEEKDAY.SATURDAY, active: true, startTime: '09:00', endTime: '22:00' },
]

export const menuSections: MenuSection[] = [
  {
    id: 1, name: 'Promoções', menuId: 1, menu: menus.find(el => el.id === 1), products: [
      { id: 1, sectionId: 1, price: 10, productId: 1, priceDetail: 'SALEPRODUCT:1', product: products.find(el => el.id === 1) },
      { id: 2, sectionId: 1, price: 10, productId: 2, priceDetail: 'SALEPRODUCT:2', product: products.find(el => el.id === 2) },
      { id: 3, sectionId: 1, price: 10, productId: 3, priceDetail: 'SALEPRODUCT:3', product: products.find(el => el.id === 3) },
    ]
  },
  {
    id: 2, name: 'Saches', menuId: 1, menu: menus.find(el => el.id === 1), products: [
      { id: 4, sectionId: 1, price: 1.5, productId: 4, priceDetail: 'PRODUCT:4', product: products.find(el => el.id === 4) },
      { id: 5, sectionId: 1, price: 1.4, productId: 5, priceDetail: 'PRODUCT:5', product: products.find(el => el.id === 5) },
    ]
  }
]

export function getMenuMounted() {
  return menus.map(m => ({
    ...m,
    timeTable: menuTimeTable.filter(mtt => mtt.menuId === m.id),
    sections: menuSections.filter(ms => ms.menuId === m.id),
  }))
}