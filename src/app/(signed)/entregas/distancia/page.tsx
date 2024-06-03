'use client'

import { DeliveryFeeDistance, deliveryFeeDistance } from "@/data/delivery-fee.data"
import { formatKilometer, formatNumber } from "@/utils"
import { TruckIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import DefaultPage from "../../ui/default-page"
import Table from "../../ui/table"
import { useController } from "./controller"
import Modal from "./modal"

export default function Page() {
  const {
    isModalOpen, handleCloseModal,
    deliveryFee,
    handleNew, handleEdit, handleRemove
  } = useController()

  const allDeliveryFees = useMemo(() => deliveryFeeDistance, [])

  return (
    <>
      <Modal
        deliveryFee={deliveryFee}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />

      <DefaultPage
        Icon={TruckIcon}
        title="Taxa de Entrega - Distância"
        description="Lista de preço de entrega por bairro"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Nova Taxa de Entrega - Distância
          </button>
        )}
      >
        <Table
          elements={allDeliveryFees}
          headers={[
            {
              name: 'name', size: '40%', title: 'KM', render: (dfd: DeliveryFeeDistance) => {
                const from = formatKilometer(dfd.from)
                const to = formatKilometer(dfd.to)

                return `De ${from} até ${to}`
              }
            },
            { name: 'price', size: '15%', title: 'Preço', render: (dfd: DeliveryFeeDistance) => `R$ ${formatNumber(dfd.price)}` }
          ]}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          useSearch
          setCompareSearchFn={(query, el) => (el.name.toLowerCase().includes(query.toLowerCase()))
          }
        />
      </DefaultPage>
    </>
  )
}