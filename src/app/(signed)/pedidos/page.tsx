'use client'

import { ORDER_STATUS } from '@/data/order.data'
import { FireIcon, HomeIcon, InboxIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import DefaultPage from '../ui/default-page'
import OrderCard from '../ui/order-card'
import { useController } from './controller'
import Modal from './modal'

export default function Page() {
  const {
    orders, order,

    handleCardClick, handleChangeStatus,

    isModalOpen, handleCloseModal,

    actionButtons
  } = useController()

  const pending = useMemo(() => orders.filter(el => el.status === ORDER_STATUS.PENDING), [orders])
  const accepted = useMemo(() => orders.filter(el => el.status === ORDER_STATUS.ACCEPTED), [orders])
  const outForDelivery = useMemo(() => orders.filter(el => el.status === ORDER_STATUS.OUT_FOR_DELIVERY), [orders])
  const delivered = useMemo(() => orders.filter(el => el.status === ORDER_STATUS.DELIVERED), [orders])

  const oderQuantity = useMemo(() => pending.length + accepted.length + outForDelivery.length + delivered.length, [orders])

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        order={order}
        actionButtons={actionButtons}
        handleChangeStatus={handleChangeStatus}
      />

      <DefaultPage
        Icon={ShoppingCartIcon}
        title={`Pedidos`}
        description={`${oderQuantity} Pedido(s) no total`}
      >
        <div className="grid grid-cols-4 gap-2 mt-2">
          <div className='bg-gray-50 rounded-md'>
            <p className='text-sm text-gray-600 text-center flex align-middle justify-center italic p-1'>
              <InboxIcon className='w-5 h-5 mr-2' /> Realizados ({pending.length})
            </p>

            <ul
              role='list'
              className="grid grid-cols-1 p-2 gap-3"
            >
              {pending.length > 0 && pending.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  handleCardActionButtonClick={handleChangeStatus}
                  handleCardClick={handleCardClick}
                  actionButtons={actionButtons[ORDER_STATUS.PENDING]}
                />
              ))}
            </ul>
          </div>

          <div className='bg-gray-50 rounded-md'>
            <p className='text-sm text-gray-600 text-center flex align-middle justify-center italic p-1'>
              <FireIcon className='w-5 h-5 mr-2' /> Em Preparo ({accepted.length})
            </p>

            <ul
              role='list'
              className="grid grid-cols-1 p-2 gap-3"
            >
              {accepted.length > 0 && accepted.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  handleCardActionButtonClick={handleChangeStatus}
                  handleCardClick={handleCardClick}
                  actionButtons={actionButtons[ORDER_STATUS.ACCEPTED]}
                />
              ))}
            </ul>
          </div>

          <div className='bg-gray-50 rounded-md'>
            <p className='text-sm text-gray-600 text-center flex align-middle justify-center italic p-1'>
              <TruckIcon className='w-5 h-5 mr-2' /> Em Entrega ({outForDelivery.length})
            </p>

            <ul
              role='list'
              className="grid grid-cols-1 p-2 gap-3"
            >
              {outForDelivery.length > 0 && outForDelivery.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  handleCardActionButtonClick={handleChangeStatus}
                  handleCardClick={handleCardClick}
                  actionButtons={actionButtons[ORDER_STATUS.OUT_FOR_DELIVERY]}
                />
              ))}
            </ul>
          </div>

          <div className='bg-gray-50 rounded-md'>
            <p className='text-sm text-gray-600 text-center flex align-middle justify-center italic p-1'>
              <HomeIcon className='w-5 h-5 mr-2' /> Entregues ({delivered.length})
            </p>

            <ul
              role='list'
              className="grid grid-cols-1 p-2 gap-3"
            >
              {delivered.length > 0 && delivered.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  handleCardActionButtonClick={handleChangeStatus}
                  handleCardClick={handleCardClick}
                />
              ))}
            </ul>
          </div>
        </div>
      </DefaultPage>
    </>
  )
}