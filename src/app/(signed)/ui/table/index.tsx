'use client'

import { classNames } from "@/app/utils"
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid"
import { useCallback, useEffect, useMemo } from "react"
import TableActionButton from "./action-button.table"
import { useController } from "./controller"

interface TableHeader {
  title: string
  name: string
  size?: string
  render?: (el: any, idx: number) => string | JSX.Element | number
}

interface ComponentProps {
  element: any
}

export interface TableProps {
  headers: TableHeader[]
  elements: any[]
  handleEdit?: (e: any) => void
  handleRemove?: (e: any) => void
  paginationOpts?: { limit: number }
  PrependButtons?: React.ComponentType<ComponentProps>
  AppendButtons?: React.ComponentType<ComponentProps>
  useSearch?: boolean
  setCompareSearchFn?: (query: string, el: any) => boolean
}

export default function Table({
  headers,
  elements,
  handleEdit,
  handleRemove,
  paginationOpts,
  PrependButtons,
  AppendButtons,
  useSearch,
  setCompareSearchFn
}: TableProps) {

  const { query, setQuery, pagination, setPagination, next, prev, goToPage, setOpts, setElements, searchTimeout, setSearchTimeout } = useController()

  const loadPagination = useCallback(() => {
    const limit = paginationOpts ? paginationOpts.limit : 10

    setOpts({ limit })
  }, [paginationOpts])

  useEffect(() => {
    loadPagination()
    setElements(elements)

    if (pagination.elements.length === 0) {
      prev()
    }
  }, [elements])

  useEffect(() => {
    if (pagination.elements.length === 0) prev()
  }, [pagination.elements.length])

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const els = query === ''
      ? elements
      : elements.filter((el: any) => setCompareSearchFn ? setCompareSearchFn(query, el) : el)

    const timeout = setTimeout(() => {
      setElements(els)
    }, 500)

    setSearchTimeout(timeout)
  }, [query])

  const hasActions = handleEdit || handleRemove || PrependButtons || AppendButtons

  const size = useMemo(() => (headers.length), [headers.length])

  return (
    <>
      {useSearch && setCompareSearchFn && (
        <div className="mt-4">
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Procurar na tabela ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
        </div>
      )}

      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  {headers.map((el, idx) => {
                    let className = `w-1/${size} p-3.5 text-left text-sm font-semibold text-gray-900`

                    if (idx === 0) {
                      className = `${className} pr-4 sm:pl-0`
                    }

                    return (
                      <th key={idx} scope="col" className={className}>
                        {el.title}
                      </th>
                    )
                  })}

                  {hasActions && (
                    <th key='actions' scope="col" className={`w-1/${(size + 1)} py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-0 text-center`}>
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {pagination.elements.length === 0 && (
                  <tr className="divide-x divide-gray-200">
                    <td className='whitespace-nowrap p-4 text-sm text-gray-500 text-center italic' colSpan={100}>
                      Nenhum elemento encontrado
                    </td>
                  </tr>
                )}

                {pagination.elements.length > 0 && pagination.elements.map((element: any, i: number) => (
                  <tr key={i} className="divide-x divide-gray-200">
                    {headers.map((el, idx) => {
                      let className = `w-1/${(size + 1)} p-4 text-sm text-gray-500 truncate text-elispsis max-w-2xl`
                      let text = element[el.name]

                      if (idx === 0) {
                        className = `${className} font-medium text-gray-900 sm:pl-0`
                      }

                      if (el.render) {
                        text = el.render(element, ((Number(pagination.from) - 1) + i))
                      }

                      return (
                        <td key={idx} className={className}> {text} </td>
                      )
                    })}

                    {hasActions && (
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0 text-center space-x-1">
                        {PrependButtons && (<PrependButtons element={element} />)}

                        {handleEdit && (
                          <TableActionButton
                            title="Editar"
                            Icon={PencilIcon}
                            fn={() => handleEdit(element)}
                          />
                        )}

                        {handleRemove && (
                          <TableActionButton
                            title="Remover"
                            Icon={TrashIcon}
                            fn={() => handleRemove(element)}
                          />
                        )}

                        {AppendButtons && (<AppendButtons element={element} />)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {pagination && elements.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-0 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                onClick={prev}
                className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Anterior
              </a>
              <a
                onClick={next}
                className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Próximo
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{pagination.from}</span> até <span className="font-medium">{pagination.to}</span> de{' '}
                  <span className="font-medium">{elements.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a
                    onClick={prev}
                    className={
                      classNames(pagination.hasPrev ? 'text-gray-900' : 'text-gray-400', "relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0")
                    }
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {
                    [...Array(pagination.totalPages).keys()].map(el => {
                      let className = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'

                      let index = el + 1
                      let active = pagination.currPage === index

                      if (active) {
                        className = "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      }

                      return (
                        <a
                          key={el}
                          className={className}
                          onClick={() => goToPage(index)}
                        >
                          {index}
                        </a>
                      )
                    })
                  }
                  <a
                    onClick={next}
                    className={
                      classNames(pagination.hasNext ? 'text-gray-900' : 'text-gray-400', "relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0")
                    }
                  >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}