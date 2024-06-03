'use client'

interface TableActionButtonProps {
  Icon: any
  title: string
  fn: (el: any) => void
}

export default function TableActionButton({
  title,
  Icon,
  fn
}: TableActionButtonProps) {
  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={fn}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}