'use client'

import { BuyingStep, VirtualProduct } from "@/data/buying-steps.data"
import { Category, categories } from "@/data/categories.data"
import { Product, getProductsMounted } from "@/data/products.data"
import { formatNumber, normalizeStringToSearch } from "@/utils"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Square3Stack3DIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import ComboBox from "../../ui/combobox"
import ModalDialog from "../../ui/modal"
import Table from "../../ui/table"
import { useVirtualModalController } from "./controller"

interface ModalProps {
  open: boolean
  setOpen: () => void
  buyingStep: BuyingStep | undefined
}

export default function Modal({ open, setOpen, buyingStep }: ModalProps) {
  const {
    values, errors, touched, handleSubmit, handleChange, setValues, resetForm,

    productNamePrefix, setProductNamePrefix,
    productPriceDiscount, setProductPriceDiscount,

    handleAddLooseProduct, handleRemoveProduct, handleAddProduct, handleAddProductByCategoryId
  } = useVirtualModalController()

  useEffect(() => {
    if (!buyingStep) return resetForm()

    let prods: any[] = []

    if (buyingStep.products) {
      prods = buyingStep.products.map(el => ({
        id: el.id,
        name: el.name,
        nameBkp: el.name,
        description: el.description,
        price: formatNumber(el.price),
        priceBkp: formatNumber(el.price)
      }))
    }

    setValues({
      id: buyingStep.id,
      name: buyingStep.name,
      type: buyingStep.type,
      products: prods
    })
  }, [buyingStep])

  return (
    <ModalDialog
      open={open}
      setOpen={setOpen}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <Square3Stack3DIcon className='h-5 w-5 mt-1 mr-1 shrink-0' />
            Cadastrar/Editar Etapa de Compra Produtos Virtuais</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Cadastrar ou editar uma etapa de compra você deve preencher os dados de nome, descrição (não obrigatório) e preço para cada item dessa etapa.
          </p>

          <div className="mt-2 flex space-y-1 flex-col">
            <p className="text-sm leading-6 text-gray-600">
              Observações:
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              ¹ Campo Auxiliar. Use a prefixação de nome de produto para atribuir a todos os produtos da tabela um prefixo.
              Ex.: Pizza Calabresa -&gt; 1/2 Pizza Calabresa.
              <span className="italic">&nbsp;Esse campo não será apresentado ao cliente.</span>
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              ² Campo Auxiliar. Use o desconto para aplicar uma diminuição no valor de todos os produtos da tabela.
              Ex.: 50% : R$20,00 -&gt; R$10,00.
              <span className="italic">&nbsp;Esse campo não será apresentado ao cliente.</span>
            </p>
          </div>

          <div className="flex mt-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5" aria-hidden="true" />

            <span className="text-sm leading-6 text-red-400 flex ml-1">Campos Obrigatórios</span>
          </div>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3" onSubmit={handleSubmit}>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              <div className="md:col-span-3 relative">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome da Etapa de Compra *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors?.name && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-8">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  className="w-full mt-0 md:mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleAddLooseProduct}
                >
                  + Produto Avulso
                </button>
              </div>

              <div className="md:col-span-3 relative">
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

                      return handleAddProduct(p)
                    }}
                    onSearch={(query, elements) => {
                      return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-3 relative">
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

                      handleAddProductByCategoryId(c.id)
                    }}
                    onSearch={(query, elements) => {
                      return elements.filter(p => normalizeStringToSearch(p.name).includes(normalizeStringToSearch(query)))
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="prefix" className="block text-sm font-medium leading-6 text-gray-900">
                  Aplicar Prefixo Geral¹
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="prefix"
                    id="prefix"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={productNamePrefix}
                    onChange={e => setProductNamePrefix(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                  Aplicar Desconto Geral (%)²
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={productPriceDiscount}
                    onChange={e => setProductPriceDiscount(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <Table
                  elements={values.products}
                  headers={[
                    {
                      name: 'name', title: 'Nome *', render: (el: VirtualProduct, idx: number) => {
                        const inputName = `products[${idx}]`
                        const error = (typeof errors.products === 'object' ? errors.products[idx] : '') as any
                        const isTouched = (typeof touched.products === 'object' ? touched.products[idx] : '') as any

                        return (
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              type="text"
                              name={`${inputName}.name`}
                              id={`${inputName}.name`}
                              value={el.name}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {isTouched && error && error['name'] && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                        )
                      }
                    },
                    {
                      name: 'description', title: 'Descrição', render: (el: VirtualProduct, idx: number) => {
                        const inputName = `products[${idx}]`
                        const error = (typeof errors.products === 'object' ? errors.products[idx] : '') as any
                        const isTouched = (typeof touched.products === 'object' ? touched.products[idx] : '') as any

                        return (
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              type="text"
                              name={`${inputName}.description`}
                              id={`${inputName}.description`}
                              value={el.description}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {isTouched && error && error['description'] && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                        )
                      }
                    },
                    {
                      name: 'price', title: 'Preço *', render: (el: VirtualProduct, idx: number) => {
                        const inputName = `products[${idx}]`
                        const error = (typeof errors.products === 'object' ? errors.products[idx] : '') as any

                        return (
                          <>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                R$
                              </div>

                              <input
                                type="text"
                                name={`${inputName}.price`}
                                id={`${inputName}.price`}
                                value={el.price}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {error && error['price'] && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                            {error && error['price'] && (
                              <p className="text-red-400 text-xs mt-1">
                                {error['price']}
                              </p>
                            )}
                          </>
                        )
                      }
                    }
                  ]}
                  handleRemove={handleRemoveProduct}
                  paginationOpts={{ limit: 5 }}
                  useSearch
                  setCompareSearchFn={(query, el: VirtualProduct) => ((el.name || '').toLowerCase().includes(query.toLowerCase()))}
                />
                {touched.products && errors?.products && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {typeof errors.products === "string" ? errors.products : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={setOpen}>
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