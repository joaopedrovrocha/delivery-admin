'use client'

import { Sale, getSalesMounted } from "@/app/data/sales.data"
import { TagIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import DefaultPage from "../ui/default-page"
import Table from "../ui/table"
import { useController } from "./controller"
import Modal from "./modal"

export default function Page() {
  const {
    sale,
    isModalOpen, handleCloseModal,
    handleNew, handleEdit, handleRemove
  } = useController()

  const sales = useMemo(() => getSalesMounted(), [])

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        sale={sale}
      />

      <DefaultPage
        Icon={TagIcon}
        title="Promoções"
        description="Lista de Promoções"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          > Nova Promoção </button>
        )}
      >
        <Table
          elements={sales}
          headers={[
            { name: 'name', size: '60%', title: 'Nome' },
            { name: 'products', size: '15%', title: 'Produtos', render: (s: Sale) => ((s.products?.length || 0).toString()) }
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