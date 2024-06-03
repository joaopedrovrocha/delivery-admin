import { Customer, CustomerAddress, customerAddresses, customers } from "./customer.data"
import { Product, products } from "./products.data"

export enum ORDER_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  NOT_ORDERED = 'not_ordered',
  DELIVERED = 'delivered',
  FINISHED = 'finished',
}

export interface Order {
  id: number
  customerId: number
  customer?: Customer
  customerAddressId: number
  customerAddress?: CustomerAddress
  status: ORDER_STATUS
  statusNote?: string
  productsTotal: number | string
  deliveryFee: number | string
  deliveryFeeDetail: string
  total: number | string
  orderProducts?: OrderProduct[]
  statusChangedDate: string
}

export interface OrderProduct {
  id: number
  orderId: number
  order?: Order
  productId: number
  product?: Product
  price: number | string
  priceDetail: string
  priceTotal: number | string
  quantity: number
}

export const orders: Order[] = [
  { id: 1, customerId: 1, customerAddressId: 1, status: ORDER_STATUS.PENDING, productsTotal: 100, deliveryFee: 10, deliveryFeeDetail: 'DISTRICT|1', total: 110, statusChangedDate: '01/01/2024 10:00:00' },
  { id: 2, customerId: 2, customerAddressId: 2, status: ORDER_STATUS.PENDING, productsTotal: 80, deliveryFee: 12, deliveryFeeDetail: 'DISTRICT|2', total: 92, statusChangedDate: '01/01/2024 10:00:00' },
  { id: 3, customerId: 3, customerAddressId: 3, status: ORDER_STATUS.PENDING, productsTotal: 50, deliveryFee: 15, deliveryFeeDetail: 'CONDO|1', total: 65, statusChangedDate: '01/01/2024 10:00:00' },
]

export const orderProducts: OrderProduct[] = [
  { id: 1, orderId: 1, productId: 7, price: 10, priceDetail: 'PRODUCT|7', priceTotal: 100, quantity: 10 },
  { id: 2, orderId: 2, productId: 7, price: 10, priceDetail: 'PRODUCT|7', priceTotal: 80, quantity: 8 },
  { id: 3, orderId: 3, productId: 3, price: 25, priceDetail: 'PRODUCT|3', priceTotal: 50, quantity: 2 },
]

export function getOrdersMounted() {
  const items = orderProducts.reduce((prev: any, curr) => {
    if (!prev[curr.orderId]) prev[curr.orderId] = []

    prev[curr.orderId].push({
      ...curr,
      product: products.find(el => el.id === curr.productId)
    })

    return prev
  }, {})

  return orders.map(order => ({
    ...order,
    customer: customers.find(el => el.id === order.customerId),
    customerAddress: customerAddresses.find(el => el.id === order.customerAddressId),
    orderProducts: items[order.id]
  }))
}