'use client'

import { Category, categories } from "@/app/data/categories.data"
import { Menu } from "@/app/data/menu.data"
import { Product, getProductsMounted } from "@/app/data/products.data"
import { Sale, getSalesMounted } from "@/app/data/sales.data"
import { classNames, formatNumber, normalizeStringToSearch } from "@/app/utils"
import { Bars4Icon, ExclamationCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import ComboBox from "../../ui/combobox"
import ModalDialog from "../../ui/modal"
import Table from "../../ui/table"
import { Section, SectionProduct, useController } from "./controller"

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  menu: Menu | undefined
}

export default function Modal({ isModalOpen, handleCloseModal, menu }: ModalProps) {
  const {
    values, touched, errors, handleChange, handleSubmit, resetForm, setValues,

    handleAddSection, handleRemoveSection, handleSetCurrent,
    handleAddProduct, handleRemoveProduct, handleAddProductByCategory, handleAddProductBySale,
  } = useController()

  useEffect(() => {
    if (!menu) return resetForm()

    const sections = menu.sections?.map((ms, idx) => ({
      ...ms,
      active: idx === 0,
      products: ms.products?.map(msp => ({
        ...msp,
        id: msp.id.toString()
      } as unknown as SectionProduct))
    } as unknown as Section)) || []

    setValues({ sections })
  }, [menu])

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <Bars4Icon className='h-5 w-5 mt-1 mr-1 shrink-0' /> Atribuir Produtos
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Monte o Cardápio do e-commerce
          </p>

          <div className="flex mt-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5" aria-hidden="true" />

            <span className="text-sm leading-6 text-red-400 flex ml-1">Campos Obrigatórios</span>
          </div>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3" onSubmit={handleSubmit}>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              <div className="col-span-6">
                <div className="sm:hidden">
                  <select
                    id="section"
                    name="section"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue={values.sections.find(section => section.active)?.name}
                  >
                    {values.sections.map(section => (
                      <option key={section.id}>{section.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                      {values.sections.map(section => (
                        <a
                          key={section.id}
                          onClick={() => handleSetCurrent(section)}
                          className={classNames(
                            section.active
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                            'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
                          )}
                          aria-current={section.active ? 'page' : undefined}
                        >
                          {section.name}
                          {section.products.length > 0 ? (
                            <span
                              className={classNames(
                                section.active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                                'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                              )}
                            >
                              {section.products.length}
                            </span>
                          ) : null}
                        </a>
                      ))}
                      <a
                        onClick={handleAddSection}
                        className='flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer border-gray-500 text-gray-600'
                      >
                        <PlusIcon className="h-5 w-5" /> Nova Seção
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              {values.sections.map((section, idx) => {
                const inputName = `sections[${idx}]`
                const error = (typeof errors.sections === 'object' ? errors.sections[idx] : '') as any
                const isTouched = (typeof touched.sections === 'object' ? touched.sections[idx] : '') as any

                return (
                  <div className={classNames(section.active ? "" : "hidden", "col-span-6 grid grid-cols-subgrid gap-6")} key={section.id}>
                    <div className="col-span-6 md:col-span-3">
                      <label htmlFor={`${inputName}.name`} className="block text-sm font-medium leading-6 text-gray-900">
                        Nome da Seção *
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          name={`${inputName}.name`}
                          id={`${inputName}.name`}
                          value={section.name}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleChange}
                        />
                        {isTouched && error && error['name'] && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-3 relative">
                      <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                        Selecionar Produto
                      </label>
                      <div className="mt-2">
                        <ComboBox
                          name="product"
                          elements={getProductsMounted()}
                          onChange={(p: Product) => {
                            if (!p) {
                              return
                            }

                            return handleAddProduct(section, p)
                          }}
                          onSearch={(query, elements) => {
                            return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-3 relative">
                      <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Selecionar Categoria
                      </label>
                      <div className="mt-2">
                        <ComboBox
                          name="category"
                          elements={categories}
                          onChange={(c: Category) => {
                            if (!c) {
                              return
                            }

                            return handleAddProductByCategory(section, c)
                          }}
                          onSearch={(query, elements) => {
                            return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-3 relative">
                      <label htmlFor="sale" className="block text-sm font-medium leading-6 text-gray-900">
                        Selecionar Promoção
                      </label>
                      <div className="mt-2">
                        <ComboBox
                          name="sale"
                          elements={getSalesMounted()}
                          onChange={(s: Sale) => {
                            if (!s) {
                              return
                            }

                            return handleAddProductBySale(section, s)
                          }}
                          onSearch={(query, elements) => {
                            return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <Table
                        elements={section.products}
                        headers={[
                          { name: 'name', title: 'Nome', render: (el: SectionProduct, idx: number) => el.product.name },
                          { name: 'price', title: 'Preço', render: (el: SectionProduct, idx: number) => `R$ ${formatNumber(el.price)}` },
                        ]}
                        handleRemove={handleRemoveProduct}
                        paginationOpts={{ limit: 2 }}
                        useSearch
                        setCompareSearchFn={(query, el: SectionProduct) => ((el.product.name || '').toLowerCase().includes(query.toLowerCase()))}
                      />
                    </div>

                    <div className="col-span-6">
                      <button
                        type="button"
                        className="w-full mt-0 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 flex align-middle justify-center gap-2"
                        onClick={() => handleRemoveSection(section)}
                      >
                        <XMarkIcon className="h-5 w-5" /> Remover Seção
                      </button>
                    </div>
                  </div>
                )
              })}
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