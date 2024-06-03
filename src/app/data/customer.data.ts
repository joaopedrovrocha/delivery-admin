import { Order } from "./order.data"

export interface Customer {
  id: number
  name: string
  phoneNumber: string
  email: string
  orders?: Order[]
  customerAddresses?: CustomerAddress[]
}

export interface CustomerAddress {
  id: number
  name: string
  zipCode: number
  streetName: string
  streetNumber: string
  district: string
  city: string
  state: string
  complement?: string
  customerId: number
}

export const customers: Customer[] = [
  { id: 1, name: 'Celmo Vieira Borges', phoneNumber: '(34) 99999-0909', email: 'celmo@gmail.com' },
  { id: 2, name: 'Luciane Silva Vieira', phoneNumber: '(34) 99999-1010', email: 'luciane@gmail.com' },
  { id: 3, name: 'Bianca Teixeira Cardoso Rocha', phoneNumber: '(34) 99999-0101', email: 'bianca@gmail.com' },
]

export const customerAddresses: CustomerAddress[] = [
  { id: 1, name: 'Casa', zipCode: 38408010, streetName: 'Nome da Rua', streetNumber: '10', city: 'Uberlândia', district: 'Planalto', state: 'Minas Gerais', customerId: 1, },
  { id: 2, name: 'Casa', zipCode: 38408010, streetName: 'Nome da Rua', streetNumber: '10', city: 'Uberlândia', district: 'Planalto', state: 'Minas Gerais', customerId: 2, },
  { id: 3, name: 'Casa', zipCode: 38408116, streetName: 'R João José Silva', streetNumber: '90', city: 'Uberlândia', district: 'Santa Mônica', state: 'Minas Gerais', customerId: 2, },
]

export function getCustomersMounted() {
  const addresses = customerAddresses.reduce((prev: any, curr) => {
    if (!prev[curr.customerId]) prev[curr.customerId] = []

    prev[curr.customerId].push(curr)
  }, {})

  return customers.map(customer => ({ ...customer, customerAddresses: addresses[customer.id] }))
}