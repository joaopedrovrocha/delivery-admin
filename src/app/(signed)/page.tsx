'use client'

import { classNames } from "@/utils";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const stats = [
  { name: 'Total de Pedidos', stat: '20', previousStat: '10', change: '100%', changeType: 'increase' },
  { name: 'Ticket Médio', stat: 'R$ 25,00', previousStat: 'R$ 20,00', change: '25%', changeType: 'increase' },
  { name: 'Novos Clientes', stat: '10', previousStat: '12', change: '20%', changeType: 'decrease' },
]

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">Últimos 30 dias</h3>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-gray-500">de {item.previousStat}</span>
                </div>

                <div
                  className={classNames(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
