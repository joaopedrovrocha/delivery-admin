'use client'

import { ORDER_STATUS, Order, OrderProduct } from "@/data/order.data"
import { formatNumber } from "@/utils"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ModalDialog from "../../ui/modal"

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  order: Order | undefined
  actionButtons: {
    [key in ORDER_STATUS]?: {
      showButtons: boolean,
      buttons?: {
        text: string,
        Icon: any,
        style?: string,
        status: ORDER_STATUS
      }[]
    }
  }
  handleChangeStatus: (order: Order, status: ORDER_STATUS) => void
}

export default function Modal({ isModalOpen, handleCloseModal, order, actionButtons, handleChangeStatus }: ModalProps) {

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="flex flex-col overflow-y-clip min-h-[600px] border border-gray-200 border-b-0 rounded-[10px]">
        <div className="flex justify-between text-lg font-medium text-gray-900 bg-gray-50 p-2 rounded-t-[10px]">
          <p># {order?.id} - {order?.customer?.name}</p>
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCloseModal}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          <div className="mt-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order?.orderProducts && order?.orderProducts.map((product: OrderProduct) => (
                  <li key={product.id} className="flex py-1">
                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            {product.quantity} x {product.product?.name}
                          </h3>
                          <p className="ml-4">
                            R$ {formatNumber(product.priceTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <div className="px-2">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <p>Subtotal</p>
              <p>R$ {formatNumber(order?.productsTotal || '')}</p>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <p>Entrega</p>
              <p>R$ {formatNumber(order?.deliveryFee || '')}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <p>Total</p>
              <p>R$ {formatNumber(order?.total || '')}</p>
            </div>
          </div>
          <div className="mt-2 flex align-middle justify-center">
            {actionButtons[order?.status as ORDER_STATUS] && actionButtons[order?.status as ORDER_STATUS]?.showButtons && actionButtons[order?.status as ORDER_STATUS]?.buttons?.map(el => (
              <a
                key={el.text}
                onClick={() => {
                  handleCloseModal()
                  handleChangeStatus(order as Order, el.status)
                }}
                className={`${el.style} cursor-pointer relative -mr-px inline-flex w-0 gap-1 flex-1 items-center justify-center border border-transparent py-1.5 text-lg font-semibold text-gray-900`}
              >
                <span>{el.text}</span>
                <el.Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}