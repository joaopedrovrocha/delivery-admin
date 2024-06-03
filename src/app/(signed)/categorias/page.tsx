'use client'

import { Category, categories } from "@/app/data/categories.data"
import { products } from "@/app/data/products.data"
import { FunnelIcon } from "@heroicons/react/24/outline"
import DefaultPage from "../ui/default-page"
import Table from "../ui/table"
import { useCategoriesController } from "./controller"
import Modal from "./modal"

export default function CategoriesPage() {
  const {
    category,
    isModalOpen, handleCloseModal,
    handleNew, handleEdit, handleRemove
  } = useCategoriesController()

  return (
    <>
      <Modal
        open={isModalOpen}
        setOpen={handleCloseModal}
        category={category}
      />

      <DefaultPage
        Icon={FunnelIcon}
        title="Categorias"
        description="Lista de Categoria de Produtos"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Nova Categoria
          </button>
        )}
      >
        <Table
          elements={categories}
          headers={[
            { name: 'name', size: '40%', title: 'Nome' },
            { name: 'product', size: '20%', title: 'Produtos', render: (c: Category) => products.filter(el => el.categoryId === c.id).length.toString() }
          ]}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          useSearch
          setCompareSearchFn={(query, el) => (el.name.toLowerCase().includes(query.toLowerCase()))}
        />
      </DefaultPage>
    </>
  )
}