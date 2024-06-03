'use client'

import { Category, categories } from "@/app/data/categories.data"
import { Product, getProductsMounted } from "@/app/data/products.data"
import { Sale, SaleProduct } from "@/app/data/sales.data"
import { formatNumber, normalizeStringToSearch } from "@/app/utils"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { TagIcon } from "@heroicons/react/24/outline"
import moment from "moment"
import { useEffect, useMemo } from "react"
import Datepicker from "react-tailwindcss-datepicker"
import ComboBox from "../../ui/combobox"
import CurrencyInput from "../../ui/currency.input"
import ModalDialog from "../../ui/modal"
import Table from "../../ui/table"
import { useController as useModalController } from "./controller"

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  sale: Sale | undefined
}

export default function Modal({ isModalOpen, handleCloseModal, sale }: ModalProps) {
  const {
    values, errors, touched, handleSubmit, handleChange, setValues, resetForm,

    generalDiscount, setGeneralDiscount,
    datepickerValue, setDatepickerValue, handleChangeDatepicker, dateFormat,

    handleAddProduct, handleRemoveProduct, handleAddProductByCategoryId
  } = useModalController()

  useEffect(() => {
    if (!sale) {
      setDatepickerValue(null)
      return resetForm()
    }

    let prods: SaleProduct[] = []

    if (sale.products) {
      prods = sale.products.map((el): SaleProduct => ({ ...el, price: formatNumber((el.price || '0')) }))
    }

    const startsAt = '01/06/2024'
    const endsAt = '10/06/2024'

    setDatepickerValue({
      startDate: moment(startsAt, dateFormat).toDate(),
      endDate: moment(endsAt, dateFormat).toDate()
    })

    setValues({
      ...sale,
      products: prods,
    })
  }, [sale])

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <TagIcon className='h-5 w-5 mt-1 mr-1 shrink-0' /> Cadastrar/Editar Promoção
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Cadastrar ou editar uma promoção você deve buscar por produto ou categoria e alterar o preço (caso seja necessário) para cada produto dessa etapa.
          </p>

          <div className="mt-2 flex space-y-1 flex-col">
            <p className="text-sm leading-6 text-gray-600">
              Observações:
            </p>

            <p className="text-xs leading-6 text-gray-600">
              ¹ Campo Auxiliar. O campo de desconto existe somente para auxiliar na aplicação de desconto em <b>TODOS</b> os produtos selecionados. Ele não é um campo de apresentação para o cliente do e-commerce.
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
              <div className="md:col-span-2 relative">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome da Promoção *
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

              <div className="md:col-span-2">
                <label htmlFor="datepicker" className="block text-sm font-medium leading-6 text-gray-900">
                  Validade (*)
                </label>
                <div className="mt-2 relative">
                  <Datepicker
                    inputId="datepicker"
                    primaryColor={"indigo"}
                    minDate={new Date()}
                    value={datepickerValue}
                    onChange={handleChangeDatepicker}
                    displayFormat={dateFormat}
                    inputClassName="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="&nbsp;"
                    i18n={"pt-br"}
                    separator="até"
                  />
                  {(touched.startsAt && errors?.startsAt || touched.endsAt && errors?.endsAt) && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-8">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                  Desconto Geral (%)¹
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={generalDiscount}
                    onChange={(e) => setGeneralDiscount(e.target.value)}
                  />
                </div>
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

                      const bp: SaleProduct = {
                        id: p.id,
                        price: 0,
                        productId: p.id,
                        saleId: 0,
                        product: p
                      }

                      return handleAddProduct(bp)
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

              <div className="md:col-span-6">
                <Table
                  elements={values.products}
                  headers={[
                    { name: 'name', title: 'Nome', render: (el: SaleProduct) => (el.product?.name || '') },
                    { name: 'category', title: 'Categoria', render: (el: SaleProduct) => (el.product?.category?.name || '') },
                    { name: 'original-price', title: 'Preço Original', render: (el: SaleProduct) => 'R$ ' + formatNumber(el.product?.price || '') },
                    {
                      name: 'price', title: 'Preço', render: (el: SaleProduct, idx: number) => {
                        const inputName = `products[${idx}]`
                        const error = (typeof errors.products === 'object' ? errors.products[idx] : '') as any

                        return (
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              R$
                            </div>

                            <CurrencyInput
                              type="text"
                              name={`${inputName}.price`}
                              id={`${inputName}.price`}
                              value={el.price}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error && error['price'] && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                        )
                      }
                    }
                  ]}
                  handleRemove={handleRemoveProduct}
                  paginationOpts={{ limit: 5 }}
                  useSearch
                  setCompareSearchFn={(query, el: SaleProduct) => ((el.product?.name || '').toLowerCase().includes(query.toLowerCase()))}
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