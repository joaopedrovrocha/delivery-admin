'use client'

import { useConfirmationModal } from "@/app/contexts/confirmation-modal.context"
import { ORDER_STATUS, Order, getOrdersMounted } from "@/app/data/order.data"
import { FireIcon, HomeIcon, NoSymbolIcon, TruckIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

const actionButtons = {
  [ORDER_STATUS.PENDING]: {
    buttons: [
      { text: 'Recusar', Icon: NoSymbolIcon, style: 'bg-red-500 text-white rounded-bl-lg', status: ORDER_STATUS.DECLINED },
      { text: 'Aceitar', Icon: FireIcon, style: 'bg-green-600 text-white rounded-br-lg', status: ORDER_STATUS.ACCEPTED }
    ],
    showButtons: true,
  },
  [ORDER_STATUS.ACCEPTED]: {
    buttons: [
      { text: 'Enviar para Entrega', Icon: TruckIcon, style: 'rounded-b-lg border-y-gray-200 bg-gray-900 text-white', status: ORDER_STATUS.OUT_FOR_DELIVERY }
    ],
    showButtons: true,
  },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: {
    buttons: [
      { text: 'Finalizar', Icon: HomeIcon, status: ORDER_STATUS.DELIVERED, style: 'rounded-b-lg border-y-gray-200 bg-gray-900 text-white' }
    ],
    showButtons: true,
  },
}

const confirmationModal = {
  [ORDER_STATUS.ACCEPTED]: (order: Order, callback: () => void) => ({
    title: `Aceitar Pedido #${order.id}?`,
    description: 'Ao aceitar o pedido irá para impressão e o cliente será notificado. Essa ação não pode ser desfeita. Deseja continuar?',
    onConfirm: callback
  })
}

export function useController() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [order, setOrder] = useState<Order | undefined>()
  const { handleConfirmation } = useConfirmationModal()

  useEffect(() => {
    setOrders(getOrdersMounted())
  }, [])

  function handleChangeStatus(order: Order, newStatus: ORDER_STATUS) {
    let statusKey = newStatus as keyof typeof confirmationModal
    const fn = () => setOrders(orders => ([
      ...orders.map(el => {
        if (el.id === order.id) {
          el.status = newStatus
        }

        return el
      })
    ]))

    if (confirmationModal[statusKey]) {
      return handleConfirmation(confirmationModal[statusKey](order, fn))
    }

    fn()
  }

  function handleCardClick(order: Order) {
    setOrder(order)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setTimeout(() => setOrder(undefined), 300)
    setIsModalOpen(false)
  }

  return {
    orders, order,

    handleCardClick, handleChangeStatus,

    isModalOpen, handleCloseModal,

    actionButtons,
  }
}