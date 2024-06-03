'use client'

import { Category } from '@/app/data/categories.data'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import ModalDialog from '../../ui/modal'
import { useController } from './controller'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  category: Category | undefined
}

export default function Modal({ open, setOpen, category }: ModalProps) {
  const {
    values, touched, errors, handleChange, handleSubmit, setValues, resetForm
  } = useController()

  useEffect(() => {
    if (!category) return resetForm()

    setValues(category)
  }, [category])

  return (
    <ModalDialog
      open={open}
      setOpen={setOpen}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-2 lg:grid-cols-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 flex">
            <FunnelIcon className='h-5 w-5 mt-1 mr-1 shrink-0' />
            Cadastrar/Editar Categoria</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Cadastrar ou editar categoria de produtos</p>

          <div className="flex mt-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5" aria-hidden="true" />

            <span className="text-sm leading-6 text-red-400 flex ml-1">Campos Obrigatórios</span>
          </div>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3" onSubmit={handleSubmit}>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
              <div className="md:col-span-3 relative">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome da Categoria *
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
                </div>
                {touched.name && errors?.name && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-8">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => setOpen(false)}>
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
