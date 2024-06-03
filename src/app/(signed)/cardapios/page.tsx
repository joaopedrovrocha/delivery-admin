'use client'

import { Menu } from "@/app/data/menu.data";
import { normalizeWeekday } from "@/app/utils";
import { Bars4Icon, CubeIcon } from "@heroicons/react/24/outline";
import DefaultPage from "../ui/default-page";
import Table from "../ui/table";
import TableActionButton from "../ui/table/action-button.table";
import { useController } from "./controller";
import LinkModal from "./link-modal";
import Modal from "./modal";

export default function Page() {
  const {
    isModalOpen, isLinkModalOpen, handleCloseModal,
    menu, allMenu,
    handleNew, handleEdit, handleRemove, handleLinkProducts,
  } = useController()

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        Menu={menu}
      />

      <LinkModal
        isModalOpen={isLinkModalOpen}
        handleCloseModal={handleCloseModal}
        menu={menu}
      />

      <DefaultPage
        Icon={Bars4Icon}
        title="Cardápio"
        description="Montar a Cardápio selecionado por Produto, Categoria e/ou Promoção"
        actionButton={(
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNew}
          >
            Novo Cardápio
          </button>
        )}
      >
        <Table
          elements={allMenu}
          headers={[
            { name: 'name', size: '40%', title: 'Nome' },
            {
              name: 'timetable', size: '35%', title: 'Dias de Funcionamento', render: (pg: Menu) => (pg.timeTable?.map(el => normalizeWeekday(el.weekday, 'short')).join(', ') || '')
            },
          ]}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          useSearch
          setCompareSearchFn={(query, el) => (el.name.toLowerCase().includes(query.toLowerCase())
            || (el.category && el.category?.name.toLowerCase().includes(query.toLowerCase())))
          }
          PrependButtons={({ element: p }) => (
            <TableActionButton
              title="Etapa de Compra"
              Icon={CubeIcon}
              fn={() => handleLinkProducts(p)}
            />
          )}
        />
      </DefaultPage>
    </>
  )
}