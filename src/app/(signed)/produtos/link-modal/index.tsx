'use client'

import { BuyingStep, BuyingStepProduct, getBuyingStepsMounted } from "@/app/data/buying-steps.data"
import { Product, getProductsMounted } from "@/app/data/products.data"
import { normalizeStringToSearch } from "@/app/utils"
import { ChevronDownIcon, ChevronUpIcon, CubeIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo } from "react"
import ComboBox from "../../ui/combobox"
import ModalDialog from "../../ui/modal"
import { useModalController } from "./controller"

interface ModalProps {
  isModalOpen: boolean,
  handleCloseModal: () => void
  product: Product | undefined
}

export default function Modal({ isModalOpen, handleCloseModal, product }: ModalProps) {
  const {
    values, errors, touched, handleSubmit, handleChange, setValues, resetForm,

    handleAddBuyingStep, handleRemoveBuyingStep, handleCopyFromProduct, handleMoveDown, handleMoveUp
  } = useModalController()

  const buyingSteps = useMemo(() => getBuyingStepsMounted(), [])

  useEffect(() => {
    if (!product) return resetForm()

    setValues({
      id: product.id,
      buyingSteps: product.buyingSteps || []
    })
  }, [product])

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <CubeIcon className='h-5 w-5 mt-1 mr-1 shrink-0' />
            Atribuir Etapas de Compra
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Atribuir Etapas de Compra ao Produto para criar uma experiência de compra para o cliente do e-commerce
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            ¹ Use a seleção de produtos para copiar Etapa de Compra do produto selecionado
          </p>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3" onSubmit={handleSubmit}>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              <div className="md:col-span-3 relative">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Selecionar Etapa de Compra
                </label>
                <div className="mt-2">
                  <ComboBox
                    elements={getBuyingStepsMounted()}
                    onChange={(bs: BuyingStep) => {
                      if (!bs) {
                        return
                      }

                      return handleAddBuyingStep(bs)
                    }}
                    onSearch={(query, elements) => {
                      return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-3 relative">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Copiar Etapa de Compra¹
                </label>
                <div className="mt-2">
                  <ComboBox
                    elements={getProductsMounted()}
                    onChange={(p: Product) => {
                      if (!p) {
                        return
                      }

                      return handleCopyFromProduct(p)
                    }}
                    onSearch={(query, elements) => {
                      return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Etapas de Compra
                </label>
                <ul role="list" className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]">
                  {values.buyingSteps.sort((a, b) => a.order < b.order ? -1 : 1).map((pbs, idx) => (
                    <li key={idx} className="py-4">
                      <div className="flex items-center gap-x-3">
                        <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">{pbs.buyingStep?.name}</h3>
                        {pbs.order !== 1 && (
                          <button
                            type="button"
                            className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleMoveUp(pbs)}
                          >
                            <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        )}
                        {pbs.order < values.buyingSteps.length && (
                          <button
                            type="button"
                            className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleMoveDown(pbs)}
                          >
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handleRemoveBuyingStep(pbs.id)}
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-3 truncate text-sm text-gray-500">
                        {buyingSteps.find(el => el.id === pbs.buyingStepId)?.products?.map((el: BuyingStepProduct) => el.name).join(', ') || (<>&nbsp;</>)}
                      </p>
                    </li>
                  ))}
                </ul>
                {touched.buyingSteps && errors?.buyingSteps && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {typeof errors.buyingSteps === "string" ? errors.buyingSteps : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </ModalDialog>
  )
}