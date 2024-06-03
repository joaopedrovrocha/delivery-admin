'use client'

import { useEffect, useState } from "react";

interface PaginationOpts {
  limit: number
}

interface Pagination {
  currPage: number
  totalPages: number
  totalElements: number
  pageLimit: number
  from: number
  to: number
  hasNext: boolean
  hasPrev: boolean
  elements: any[]
}

export function useController() {
  const [query, setQuery] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()
  const [pagination, setPagination] = useState<Pagination>({ currPage: 1, elements: [] } as unknown as Pagination)
  const [elements, setElements] = useState<any[]>([])

  useEffect(() => {
    if (elements.length === 0) {
      return setPagination(p => ({ ...p, elements: [] }))
    }

    const totalElements = elements.length

    const from = (pagination.currPage - 1) * pagination.pageLimit + 1
    let to = (pagination.currPage * pagination.pageLimit)

    to = to > totalElements ? totalElements : to

    const hasPrev = from !== 1
    const hasNext = to !== totalElements

    setPagination(p => ({
      ...p,
      from,
      to,
      hasNext,
      hasPrev,
      elements: elements.slice((from - 1), to),
      totalPages: Math.ceil(elements.length / p.pageLimit)
    }))
  }, [elements, pagination.currPage])

  function prev() {
    if (!pagination.hasPrev) {
      return
    }

    setPagination(p => ({ ...p, currPage: (p.currPage - 1) }))
  }

  function next() {
    if (!pagination.hasNext) {
      return
    }

    setPagination(p => ({ ...p, currPage: (p.currPage + 1) }))
  }

  function goToPage(index: number) {
    if (index === pagination.currPage) {
      return
    }

    setPagination(p => ({ ...p, currPage: index }))
  }

  function setOpts(opts: PaginationOpts) {
    setPagination(p => ({
      ...p,
      pageLimit: opts.limit
    }))
  }

  return {
    query, setQuery, searchTimeout, setSearchTimeout,

    pagination, setPagination, next, prev, goToPage, setOpts,

    setElements
  }
}