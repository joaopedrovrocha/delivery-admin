'use client'

import { Product, getProductsMounted } from "@/app/data/products.data";
import { formatNumber } from "@/app/utils";
import { CubeIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import DefaultPage from "../ui/default-page";
import Table from "../ui/table";
import TableActionButton from "../ui/table/action-button.table";
import { useController } from "./controller";
import LinkModal from "./link-modal";
import Modal from "./modal";

export default function Page() {
  const {
    isModalOpen, handleCloseModal,
    isBSModalOpen, handleCloseLinkModal,
    product,
    handleNew, handleEdit, handleRemove, handleLink,
  } = useController()

  const allProducts = useMemo(() => getProductsMounted(), [])

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        product={product}
      />

      <LinkModal
        isModalOpen={isBSModalOpen}
        handleCloseModal={handleCloseLinkModal}
        product={product}
      />

      <DefaultPage
        Icon={CubeIcon}
        title="Produtos"
        description="Lista de Produtos"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Novo Produto
          </button>
        )}
      >
        <Table
          elements={allProducts}
          headers={[
            { name: 'name', size: '40%', title: 'Nome' },
            { name: 'category', size: '35%', title: 'Categoria', render: (p: Product) => (p.category?.name || '') },
            { name: 'price', size: '15%', title: 'Preço', render: (p: Product) => `R$ ${formatNumber(p.price)}` }
          ]}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          PrependButtons={({ element: p }) => (
            <TableActionButton
              title="Etapa de Compra"
              Icon={Square3Stack3DIcon}
              fn={() => handleLink(p)}
            />
          )}
          useSearch
          setCompareSearchFn={(query, el) => (el.name.toLowerCase().includes(query.toLowerCase())
            || (el.category && el.category?.name.toLowerCase().includes(query.toLowerCase())))
          }
        />
      </DefaultPage>
    </>
  )
}