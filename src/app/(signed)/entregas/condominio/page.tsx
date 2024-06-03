'use client'

import { DeliveryFeeCondo, deliveryFeeCondo } from "@/app/data/delivery-fee.data"
import { formatNumber } from "@/app/utils"
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline"
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

  const allDeliveryFees = useMemo(() => deliveryFeeCondo, [])

  return (
    <>
      <Modal
        deliveryFee={deliveryFee}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />

      <DefaultPage
        Icon={TruckIcon}
        title="Taxa de Entrega - Condomínio"
        description="Lista de preço de entrega por condomínio"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Nova Taxa de Entrega - Condomínio
          </button>
        )}
      >
        <Table
          elements={allDeliveryFees}
          headers={[
            { name: 'name', title: 'Nome' },
            { name: 'price', title: 'Preço', render: (dfd: DeliveryFeeCondo) => `R$ ${formatNumber(dfd.price)}` },
            {
              name: 'location', title: 'Localização', render: (dfd: DeliveryFeeCondo) => (
                <div className="flex justify-center gap-3">
                  <a className="flex italic" href={`https://maps.google.com/?q=${dfd.latLongFrom}`} target="_blank">Início <MapPinIcon className="w-4 h-4" /></a>
                  <a className="flex italic" href={`https://maps.google.com/?q=${dfd.latLongTo}`} target="_blank">Fim <MapPinIcon className="w-4 h-4" /></a>
                </div>
              )
            },
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