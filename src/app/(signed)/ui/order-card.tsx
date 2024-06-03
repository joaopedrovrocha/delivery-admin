import { ORDER_STATUS, Order } from "@/app/data/order.data";
import { formatNumber } from "@/app/utils";
import { CalendarDaysIcon, CubeIcon, FireIcon, HomeIcon, NoSymbolIcon, TruckIcon, UserIcon } from "@heroicons/react/24/outline";

interface OrderCardInterface {
  order: Order
  handleCardActionButtonClick: (order: Order, status: ORDER_STATUS) => void
  handleCardClick: (order: Order) => void
  actionButtons?: {
    showButtons: boolean,
    buttons?: {
      text: string,
      Icon: any,
      style?: string,
      status: ORDER_STATUS
    }[]
  }
}

export default function OrderCard({ order, handleCardActionButtonClick, handleCardClick, actionButtons }: OrderCardInterface) {
  return (
    <li
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <a
        className="cursor-pointer"
        onClick={() => handleCardClick(order)}
      >
        <div className="flex w-full items-center justify-between space-x-6 p-3">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-2">
              <h3 className="truncate text-sm font-medium text-gray-900"> #{order.id} </h3>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Pontual
              </span>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                Atrasado
              </span>
            </div>
            <p className="mt-1 truncate text-xs text-gray-500 flex gap-1"> <UserIcon className="h-4 w-4" /> {order.customer?.name} </p>
            <p className="mt-1 truncate text-xs text-gray-500 flex gap-1"> <CubeIcon className="h-4 w-4" /> {order.orderProducts?.length} Produto(s) </p>
            <p className="mt-1 truncate text-xs text-gray-500">
              R$ {formatNumber(order.total)}
            </p>
            <p className="mt-1 truncate text-xs text-gray-500 flex gap-1"> <TruckIcon className="h-4 w-4" /> {order.customerAddress?.district} </p>
            <p className="mt-1 truncate text-xs text-gray-500 flex gap-1"> <CalendarDaysIcon className="h-4 w-4" /> {order.statusChangedDate} </p>
          </div>
        </div>
      </a>
      {actionButtons?.showButtons && (
        <div>
          <div className="flex divide-x divide-gray-200">
            {actionButtons?.buttons?.map(el => (
              <div className="flex w-0 flex-1 cursor-pointer" key={el.text}>
                <a
                  onClick={() => handleCardActionButtonClick(order, el.status)}
                  className={`${el.style} relative -mr-px inline-flex w-0 gap-1 flex-1 items-center justify-center border border-transparent py-1.5 text-sm font-semibold text-gray-900`}
                >
                  {el.text}
                  <el.Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>

      )}
    </li>
  )
}