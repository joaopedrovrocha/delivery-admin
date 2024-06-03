'use client'

import { Menu } from "@/app/data/menu.data"
import { normalizeWeekday } from "@/app/utils"
import { Field, Label, Switch } from "@headlessui/react"
import { Bars4Icon, ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import ModalDialog from "../../ui/modal"
import { useController } from "./controller"

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  Menu: Menu | undefined
}

export default function Modal({ isModalOpen, handleCloseModal, Menu }: ModalProps) {
  const { values, touched, errors, handleChange, handleSubmit, resetForm, setValues } = useController()

  useEffect(() => {
    if (!Menu) return resetForm()

    setValues(Menu)
  }, [Menu])

  return (
    <ModalDialog
      open={isModalOpen}
      setOpen={handleCloseModal}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <Bars4Icon className='h-5 w-5 mt-1 mr-1 shrink-0' /> Cadastrar/Editar Cardápio
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Cadastrar ou editar um cardápio para ser apresentado no e-commerce
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
              <div className="col-span-6 md:col-span-3 relative">
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
              <div className="col-span-6 md:col-span-3"></div>
              <div className="col-span-6 relative">
                {values.timeTable?.map((pgtt, idx) => {
                  const inputName = `timeTable[${idx}]`
                  const error = (typeof errors.timeTable === 'object' ? errors.timeTable[idx] : '') as any

                  return (
                    <div className="flex justify-between mt-3 align-middle" key={pgtt.weekday}>
                      <Field as="div" className="flex items-center min-w-40">
                        <Switch
                          checked={pgtt.active}
                          onChange={checked => setValues({
                            ...values, timeTable: values.timeTable?.map(x => ({
                              ...x,
                              active: x.weekday === pgtt.weekday ? checked : x.active,
                            }))
                          })}
                          id={`${inputName}.active`}
                          name={`${inputName}.active`}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${pgtt.active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${pgtt.active ? 'translate-x-5' : 'translate-x-0'}`}
                          />
                        </Switch>
                        <Label as="span" className="ml-3 text-sm">
                          <span className="font-medium text-gray-900">{normalizeWeekday(pgtt.weekday, 'full')}</span>
                        </Label>
                      </Field>
                      {pgtt.active && (
                        <>
                          <div className="relative">
                            <label htmlFor={`${inputName}.startTime`} className="block text-sm font-medium leading-6 text-gray-900">
                              Hora Inicial
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <ClockIcon className="h-5 w-5 text-gray-500" />
                              </div>

                              <input
                                type="text"
                                name={`${inputName}.startTime`}
                                id={`${inputName}.startTime`}
                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={pgtt.startTime}
                                onChange={handleChange}
                                placeholder="10:00"
                              />
                              {error && error['startTime'] && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                            {error && error['startTime'] && (
                              <p className="text-red-400 text-xs mt-1">
                                {error['startTime']}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <label htmlFor={`${inputName}.endTime`} className="block text-sm font-medium leading-6 text-gray-900">
                              Hora Final
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <ClockIcon className="h-5 w-5 text-gray-500" />
                              </div>

                              <input
                                type="text"
                                name={`${inputName}.endTime`}
                                id={`${inputName}.endTime`}
                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={pgtt.endTime}
                                onChange={handleChange}
                                placeholder="22:00"
                              />
                              {error && error['endTime'] && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                            {error && error['endTime'] && (
                              <p className="text-red-400 text-xs mt-1">
                                {error['endTime']}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
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