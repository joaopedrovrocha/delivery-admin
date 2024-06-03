'use client'

import { DeliveryFeeCondo } from "@/app/data/delivery-fee.data"
import { formatNumber } from "@/app/utils"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { TruckIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import CurrencyInput from "../../../ui/currency.input"
import ModalDialog from "../../../ui/modal"
import { useController } from "./controller"

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  deliveryFee: DeliveryFeeCondo | undefined
}

export default function Modal({ isModalOpen, handleCloseModal, deliveryFee }: ModalProps) {
  const { values, touched, errors, handleChange, handleSubmit, resetForm, setValues } = useController()

  useEffect(() => {
    if (!deliveryFee) return resetForm()

    setValues({
      ...deliveryFee,
      price: formatNumber(deliveryFee.price)
    })
  }, [deliveryFee])

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <TruckIcon className='h-5 w-5 mt-1 mr-1 shrink-0' /> Cadastrar/Editar Entrega por Bairro
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Cadastrar ou editar uma uma taxa de entrega por condomínio
          </p>

          <div className="flex mt-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5" aria-hidden="true" />

            <span className="text-sm leading-6 text-red-400 flex ml-1">Campos Obrigatórios</span>
          </div>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3" onSubmit={handleSubmit}>
          <input type="hidden" name="id" id="id" value={values.id} />

          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              <div className="col-span-6 lg:col-span-3 md:col-span-3 relative">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome do Produto *
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
              <div className="col-span-6 lg:col-span-3 md:col-span-3 relative">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Preço *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    R$
                  </div>

                  <CurrencyInput
                    type="text"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {touched.price && errors?.price && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-6 lg:col-span-3 md:col-span-3 relative">
                <label htmlFor="latLongFrom" className="block text-sm font-medium leading-6 text-gray-900">
                  LatLong De *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="latLongFrom"
                    id="latLongFrom"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.latLongFrom}
                    onChange={handleChange}
                  />
                  {touched.latLongFrom && errors?.latLongFrom && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-8">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-6 lg:col-span-3 md:col-span-3 relative">
                <label htmlFor="latLongTo" className="block text-sm font-medium leading-6 text-gray-900">
                  LatLong Até *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="latLongTo"
                    id="latLongTo"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.latLongTo}
                    onChange={handleChange}
                  />
                  {touched.latLongTo && errors?.latLongTo && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-8">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
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