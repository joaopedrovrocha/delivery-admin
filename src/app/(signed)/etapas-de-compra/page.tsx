'use client'

import { BuyingStep, getBuyingStepsMounted } from "@/app/data/buying-steps.data"
import { Square3Stack3DIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import DefaultPage from "../ui/default-page"
import Table from "../ui/table"
import { useController } from "./controller"
import Modal from "./modal"
import { join } from "path"

export default function Page() {
  const {
    buyingStep,

    handleNew, handleEdit, handleRemove, showModal, handleCloseModal
  } = useController()

  const buyingSteps = useMemo(() => getBuyingStepsMounted(), [])

  return (
    <>
      <Modal
        open={showModal}
        setOpen={handleCloseModal}
        buyingStep={buyingStep}
      />

      <DefaultPage
        Icon={Square3Stack3DIcon}
        title="Etapas de Compra"
        description="Lista de Todas as Etapas de Compra de Produtos"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Nova Etapa de Compra
          </button>
        )}
      >
        <Table
          elements={buyingSteps}
          headers={[
            { name: 'name', size: '50%', title: 'Nome' },
            { name: 'products', title: 'Produtos', render: (bs: BuyingStep) => (bs.products?.map(el => el.name).join(', ')) || '' }
          ]}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          useSearch
          setCompareSearchFn={(query, el) => (el.name.toLowerCase().includes(query.toLowerCase()) || el.type.toLowerCase().includes(query.toLowerCase()))}
        />
      </DefaultPage>
    </>
  )
}