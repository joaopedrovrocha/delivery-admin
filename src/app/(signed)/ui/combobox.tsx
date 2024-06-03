'use client'

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useMemo, useState } from "react";

interface ComboBoxProps {
  name?: string
  elements: any[]
  onChange: (e: any) => void
  onSearch: (query: string, elements: any[]) => any[]
}

export default function ComboBox({ name, elements, onChange, onSearch }: ComboBoxProps) {
  const [query, setQuery] = useState<string>('')

  const filteredElements = useMemo(() => {
    return query === ''
      ? []
      : onSearch(query, elements)
  }, [query])

  return (
    <>
      <Combobox
        onChange={onChange}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <div>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />

            <ComboboxInput
              className="block w-full rounded-md border-0 pl-11 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Pesquisar..."
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
              id={name}
              name={name}
            />
          </div>

          {filteredElements.length > 0 && (
            <ComboboxOptions static className="bg-white ring-1 ring-inset ring-gray-300 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 absolute w-full z-50">
              {filteredElements.map((product) => (
                <ComboboxOption
                  key={product.id}
                  value={product}
                  className={({ focus }) =>
                    `cursor-pointer select-none px-4 py-2 ${focus ? 'bg-indigo-600 text-white' : ''}`
                  }
                >
                  {product.name}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}

          {query !== '' && filteredElements.length === 0 && (
            <p className="p-4 text-sm text-gray-500 absolute bg-white ring-1 ring-inset ring-gray-300 w-full">Nenhum elemento encontrado.</p>
          )}
        </div>
      </Combobox>
    </>
  )
}