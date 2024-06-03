export interface DeliveryFeeDistrict {
  id: number
  name: string
  price: number | string
}

export const deliveryFeeDistrict: DeliveryFeeDistrict[] = [
  { id: 1, name: 'Santa Monica', price: 10.0 },
  { id: 2, name: 'Centro', price: 12.0 },
  { id: 3, name: 'Fundinho', price: 8.0 },
]

export interface DeliveryFeeDistance {
  id: number
  from: number | string
  to: number | string
  price: number | string
}

export const deliveryFeeDistance: DeliveryFeeDistance[] = [
  { id: 1, from: 0, to: 5, price: 10 },
  { id: 2, from: 5.1, to: 10, price: 12 },
  { id: 3, from: 10.1, to: 20, price: 14 },
  { id: 4, from: 21, to: 100, price: 16 },
]

export interface DeliveryFeeCondo {
  id: number
  name: string
  latLongFrom: string
  latLongTo: string
  price: number | string
}

export const deliveryFeeCondo: DeliveryFeeCondo[] = [
  { id: 1, name: 'Jardim Versailles', latLongFrom: `-18.957819, -48.298450`, latLongTo: `-18.961051, -48.298026`, price: 15 },
  { id: 2, name: 'Jardins Barcelona', latLongFrom: '-18.951729, -48.294245', latLongTo: '-18.952880, -48.293604', price: 15 },
]